<?php
require_once __DIR__ . '/lib.php';
$u = need_auth();
$pdo = db();
$action = inp('action', 'list');

if ($action === 'list') {
    // Live USD-based rates so a client's "Paid" / "Outstanding" totals never
    // just add raw numbers across different invoice currencies.
    $rates = get_fx_rates();

    $rows = $pdo->query('
        SELECT c.*,
          (SELECT COUNT(*) FROM invoices i WHERE i.client_id=c.id) AS total_invoices
        FROM clients c
        WHERE c.archived=0
        ORDER BY c.company
    ')->fetchAll();

    foreach ($rows as &$r) {
        $st = $pdo->prepare('
            SELECT i.id, i.no, i.invoice_date, i.due_date, i.status, i.currency, i.discount,
                   COALESCE((SELECT SUM(qty*rate) FROM invoice_items x WHERE x.invoice_id=i.id),0) AS subtotal,
                   COALESCE((SELECT SUM(amt) FROM payments p WHERE p.invoice_id=i.id),0) AS paid
            FROM invoices i WHERE i.client_id=? ORDER BY i.invoice_date DESC, i.id DESC');
        $st->execute([$r['id']]);
        $r['invoices'] = $st->fetchAll();

        $outstanding = 0;
        $paidInr = 0;
        foreach ($r['invoices'] as $iv) {
            $paidInr += to_inr($iv['paid'], $iv['currency'], $rates);
            if (in_array($iv['status'], ['Cancelled', 'Draft'], true)) continue;
            $due = max(0, ((float)$iv['subtotal'] - (float)$iv['discount']) - (float)$iv['paid']);
            $outstanding += to_inr($due, $iv['currency'], $rates);
        }
        $r['outstanding'] = $outstanding;
        $r['paid'] = $paidInr;

        $st = $pdo->prepare('SELECT id, name, cat, size, uploaded_by, created_at FROM documents WHERE client_id=? ORDER BY created_at DESC, id DESC');
        $st->execute([$r['id']]);
        $r['documents'] = array_map(function ($d) {
            return [
                'id' => (int)$d['id'], 'name' => $d['name'], 'cat' => $d['cat'],
                'size' => (int)$d['size'], 'by' => $d['uploaded_by'],
                'date' => substr((string)$d['created_at'], 0, 10),
            ];
        }, $st->fetchAll());

        $st = $pdo->prepare('SELECT * FROM client_contacts WHERE client_id=? ORDER BY id');
        $st->execute([$r['id']]);
        $r['contacts'] = $st->fetchAll();

        $st = $pdo->prepare('SELECT * FROM client_notes WHERE client_id=? ORDER BY created_at DESC');
        $st->execute([$r['id']]);
        $r['note_list'] = $st->fetchAll();

        $st = $pdo->prepare('SELECT * FROM activity_log WHERE entity="client" AND entity_id=? ORDER BY created_at DESC LIMIT 25');
        $st->execute([$r['id']]);
        $r['activity'] = $st->fetchAll();
    }
    ok(['clients' => $rows]);
}

if ($action === 'create' || $action === 'update') {
    $f = [
        trim((string)inp('company', '')), trim((string)inp('contact', '')), trim((string)inp('email', '')),
        trim((string)inp('phone', '')), trim((string)inp('address', '')), trim((string)inp('gstin', '')),
        trim((string)inp('service', '')), trim((string)inp('type', 'Retainer')),
        inp('since') ?: null, inp('status', 'Active') === 'Inactive' ? 'Inactive' : 'Active',
        trim((string)inp('notes', '')),
    ];
    if ($f[0] === '') fail('Company name is required.');

    if ($action === 'create') {
        $st = $pdo->prepare('INSERT INTO clients (company,contact,email,phone,address,gstin,service,type,since,status,notes)
                             VALUES (?,?,?,?,?,?,?,?,?,?,?)');
        $st->execute($f);
        $id = (int)$pdo->lastInsertId();
        if ($f[1] !== '') {
            $pdo->prepare('INSERT INTO client_contacts (client_id,name,role,email,phone) VALUES (?,?,?,?,?)')
                ->execute([$id, $f[1], 'Primary Contact', $f[2], $f[3]]);
        }
        log_activity('client', $id, 'Client created', 'indigo');
        ok(['id' => $id]);
    }

    $id = (int)inp('id', 0);
    if (!$id) fail('Missing id.');
    $f[] = $id;
    $pdo->prepare('UPDATE clients SET company=?,contact=?,email=?,phone=?,address=?,gstin=?,service=?,type=?,since=?,status=?,notes=? WHERE id=?')
        ->execute($f);
    log_activity('client', $id, 'Client details updated', 'amber');
    ok();
}

if ($action === 'archive') {
    $id = (int)inp('id', 0);
    $pdo->prepare('UPDATE clients SET archived=1 WHERE id=?')->execute([$id]);
    log_activity('client', $id, 'Client archived', 'red');
    ok();
}

if ($action === 'add_note') {
    $id = (int)inp('client_id', 0);
    $b = trim((string)inp('body', ''));
    if (!$id || $b === '') fail('Note is empty.');
    $pdo->prepare('INSERT INTO client_notes (client_id, body, author) VALUES (?,?,?)')->execute([$id, $b, $u['name']]);
    ok();
}

if ($action === 'add_contact') {
    $id = (int)inp('client_id', 0);
    $pdo->prepare('INSERT INTO client_contacts (client_id,name,role,email,phone) VALUES (?,?,?,?,?)')
        ->execute([$id, trim((string)inp('name','')), trim((string)inp('role','')), trim((string)inp('email','')), trim((string)inp('phone',''))]);
    ok();
}

fail('Unknown action.');
