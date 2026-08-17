<?php
require_once __DIR__ . '/lib.php';
$u = need_auth();
$pdo = db();
$action = inp('action', 'list');

function load_invoices($pdo, $id = null) {
    // LEFT JOIN — not INNER — so an invoice never silently disappears from the
    // list just because its client reference is missing or stale (e.g. from
    // older test data). It still shows, just with a fallback client name.
    $sql = "SELECT i.*, COALESCE(c.company, '(client removed)') AS client
            FROM invoices i LEFT JOIN clients c ON c.id = i.client_id";
    $args = [];
    if ($id) { $sql .= ' WHERE i.id=?'; $args[] = $id; }
    $sql .= ' ORDER BY i.invoice_date DESC, i.id DESC';
    $st = $pdo->prepare($sql); $st->execute($args);
    $rows = $st->fetchAll();

    foreach ($rows as &$r) {
        $s = $pdo->prepare('SELECT descr AS `desc`, qty, rate FROM invoice_items WHERE invoice_id=? ORDER BY sort_order, id');
        $s->execute([$r['id']]);
        $r['items'] = array_map(function ($x) {
            return ['desc' => $x['desc'], 'qty' => (float)$x['qty'], 'rate' => (float)$x['rate']];
        }, $s->fetchAll());

        $s = $pdo->prepare('SELECT amt, paid_on AS date, method, ref FROM payments WHERE invoice_id=? ORDER BY paid_on, id');
        $s->execute([$r['id']]);
        $r['payments'] = array_map(function ($x) {
            return ['amt' => (float)$x['amt'], 'date' => $x['date'], 'method' => $x['method'], 'ref' => $x['ref']];
        }, $s->fetchAll());

        $r['id'] = (int)$r['id'];
        $r['clientId'] = (int)$r['client_id'];
        $r['date'] = $r['invoice_date'];
        $r['due'] = $r['due_date'];
        $r['discount'] = (float)$r['discount'];
    }
    return $rows;
}

if ($action === 'list') {
    // auto-mark overdue before listing
    $pdo->exec("UPDATE invoices SET status='Overdue'
                WHERE status IN ('Sent','Pending') AND due_date IS NOT NULL AND due_date < CURDATE()
                  AND id NOT IN (SELECT invoice_id FROM payments)");
    ok(['invoices' => load_invoices($pdo)]);
}

if ($action === 'next_number') {
    $prefix = $pdo->query("SELECT sval FROM settings WHERE skey='invoice_prefix'")->fetchColumn() ?: 'INV';
    $year = date('Y');
    $st = $pdo->prepare('SELECT COUNT(*) c FROM invoices WHERE no LIKE ?');
    $st->execute(["$prefix-$year-%"]);
    $n = (int)$st->fetch()['c'] + 1;
    ok(['no' => sprintf('%s-%s-%03d', $prefix, $year, $n)]);
}

if ($action === 'save') {
    $id       = (int)inp('id', 0);
    $no       = trim((string)inp('no', ''));
    $clientId = (int)inp('clientId', 0);
    $date     = inp('date') ?: date('Y-m-d');
    $due      = inp('due') ?: null;
    $terms    = (string)inp('terms', 'Net 15');
    $currency = strtoupper((string)inp('currency', 'INR'));
    $discount = num(inp('discount', 0));
    $notes    = (string)inp('notes', '');
    $status   = (string)inp('status', 'Draft');
    $items    = inp('items', []);

    if (!$clientId) fail('Pick a client.');
    if ($no === '') fail('Invoice number is required.');
    if (!in_array($currency, ['INR','USD','EUR','AUD'], true)) $currency = 'INR';

    // Only treat this as an edit if the ID genuinely matches an existing
    // invoice. A client can send an ID that doesn't exist here (a stale tab,
    // or a placeholder generated in the browser) — in that case this is a
    // new invoice, not a broken edit, so fall through to the insert path.
    if ($id) {
        $chk = $pdo->prepare('SELECT 1 FROM invoices WHERE id=?');
        $chk->execute([$id]);
        if (!$chk->fetch()) $id = 0;
    }

    // A submitted invoice number can go stale — the browser might not know
    // about an invoice created elsewhere (another device, an older version
    // of this app, leftover test data, etc). Rather than fail outright on a
    // collision for a NEW invoice, keep bumping the trailing number up by one
    // and retrying until a free slot is found.
    $attemptsLeft = $id ? 1 : 20;
    $lastError = null;

    while ($attemptsLeft > 0) {
        $attemptsLeft--;
        $pdo->beginTransaction();
        try {
            if ($id) {
                $upd = $pdo->prepare('UPDATE invoices SET no=?, client_id=?, invoice_date=?, due_date=?, terms=?, currency=?, discount=?, notes=?, status=? WHERE id=?');
                $upd->execute([$no, $clientId, $date, $due, $terms, $currency, $discount, $notes, $status, $id]);
                if ($upd->rowCount() === 0) {
                    // The browser thinks it's editing an invoice that no longer
                    // exists on the server (e.g. an old tab left open from
                    // before a cleanup, or it was deleted elsewhere). Insisting
                    // on inserting its line items next would silently create an
                    // orphaned row, so stop here with a clear message instead.
                    $chk = $pdo->prepare('SELECT 1 FROM invoices WHERE id=?');
                    $chk->execute([$id]);
                    if (!$chk->fetch()) {
                        $pdo->rollBack();
                        fail('This invoice no longer exists. Please refresh the page and start a new one.', 409);
                    }
                }
                $pdo->prepare('DELETE FROM invoice_items WHERE invoice_id=?')->execute([$id]);
            } else {
                $pdo->prepare('INSERT INTO invoices (no, client_id, invoice_date, due_date, terms, currency, discount, notes, status)
                               VALUES (?,?,?,?,?,?,?,?,?)')
                    ->execute([$no, $clientId, $date, $due, $terms, $currency, $discount, $notes, $status]);
                $id = (int)$pdo->lastInsertId();
                if ($id <= 0) {
                    $pdo->rollBack();
                    fail('Could not create the invoice — no ID was returned by the database.', 500);
                }
            }

            // Belt-and-braces: whichever branch we took above, confirm the
            // invoice row is really there before attaching line items to it.
            $chk = $pdo->prepare('SELECT 1 FROM invoices WHERE id=?');
            $chk->execute([$id]);
            if (!$chk->fetch()) {
                $pdo->rollBack();
                fail('This invoice could not be saved. Please refresh the page and try again.', 409);
            }

            $ins = $pdo->prepare('INSERT INTO invoice_items (invoice_id, descr, qty, rate, sort_order) VALUES (?,?,?,?,?)');
            $n = 0;
            foreach ((array)$items as $it) {
                $d = trim((string)($it['desc'] ?? ''));
                $q = num($it['qty'] ?? 0); $rt = num($it['rate'] ?? 0);
                if ($d === '' && $rt == 0) continue;
                $ins->execute([$id, $d, $q, $rt, $n++]);
            }

            $pdo->commit();
            $lastError = null;
            break;
        } catch (PDOException $e) {
            $pdo->rollBack();
            $lastError = $e;
            if ($e->getCode() === '23000' && !$id && $attemptsLeft > 0) {
                // Number collided on a brand-new invoice. Bump the trailing
                // number up by one and try again — this finds a free slot
                // even if older numbers exist with gaps (deleted invoices,
                // leftover test data, a different prefix used previously).
                if (preg_match('/^(.*?)(\d+)$/', $no, $m)) {
                    $width = strlen($m[2]);
                    $next = (int)$m[2] + 1;
                    $no = $m[1] . str_pad((string)$next, $width, '0', STR_PAD_LEFT);
                } else {
                    $no = $no . '-2';
                }
                continue;
            }
            break;
        }
    }

    if ($lastError) {
        // Don't assume every "constraint violation" is about the invoice
        // number — it could be a foreign key issue (e.g. an invalid client),
        // which needs a different, honest message instead of a misleading one.
        $rawMsg = $lastError->errorInfo[2] ?? $lastError->getMessage();
        if ($lastError->getCode() === '23000' && stripos($rawMsg, $no) !== false) {
            fail('That invoice number already exists.');
        }
        if ($lastError->getCode() === '23000' && stripos($rawMsg, 'client') !== false) {
            fail('That client no longer exists — please pick the client again and save.');
        }
        fail('Could not save the invoice: ' . $rawMsg, 500);
    }

    log_activity('invoice', $id, "Invoice $no saved", 'indigo');
    $rows = load_invoices($pdo, $id);
    ok(['invoice' => $rows[0] ?? null]);
}

if ($action === 'set_status') {
    $id = (int)inp('id', 0);
    $status = (string)inp('status', '');
    $allowed = ['Draft','Sent','Pending','Partially Paid','Paid','Overdue','Cancelled'];
    if (!in_array($status, $allowed, true)) fail('Invalid status.');
    $pdo->prepare('UPDATE invoices SET status=? WHERE id=?')->execute([$status, $id]);
    log_activity('invoice', $id, "Status changed to $status", 'amber');
    ok();
}

if ($action === 'add_payment') {
    $id     = (int)inp('invoice_id', 0);
    $amt    = num(inp('amt', 0));
    $date   = inp('date') ?: date('Y-m-d');
    $method = (string)inp('method', '');
    $ref    = (string)inp('ref', '');
    $note   = (string)inp('note', '');
    if (!$id || $amt <= 0) fail('Enter a payment amount.');

    // Prevent overpayment: a capture can never push total paid past the
    // invoice's grand total, and once fully paid no further capture is
    // accepted.
    $it = $pdo->prepare('SELECT COALESCE(SUM(qty*rate),0) s FROM invoice_items WHERE invoice_id=?');
    $it->execute([$id]);
    $subtotal = (float)$it->fetch()['s'];

    $invRow = $pdo->prepare('SELECT discount FROM invoices WHERE id=?');
    $invRow->execute([$id]);
    $invData = $invRow->fetch();
    if (!$invData) fail('Invoice not found.', 404);
    $total = max(0, $subtotal - (float)$invData['discount']);

    $pm = $pdo->prepare('SELECT COALESCE(SUM(amt),0) s FROM payments WHERE invoice_id=?');
    $pm->execute([$id]);
    $paidSoFar = (float)$pm->fetch()['s'];

    $remaining = round($total - $paidSoFar, 2);

    if ($remaining <= 0) {
        fail('This invoice is already fully paid — no further payment can be recorded.');
    }
    if ($amt > $remaining + 0.01) {
        fail('Amount exceeds the remaining balance of ' . number_format($remaining, 2) . '.');
    }

    $pdo->prepare('INSERT INTO payments (invoice_id, amt, paid_on, method, ref, note) VALUES (?,?,?,?,?,?)')
        ->execute([$id, $amt, $date, $method, $ref, $note]);

    $status = invoice_auto_status($id);
    log_activity('invoice', $id, 'Payment recorded', 'green');

    $rows = load_invoices($pdo, $id);
    ok(['invoice' => $rows[0] ?? null, 'status' => $status]);
}

fail('Unknown action.');
