<?php
require_once __DIR__ . '/lib.php';
need_auth();
$pdo = db();

$from = inp('from') ?: date('Y-m-01');
$to   = inp('to')   ?: date('Y-m-t');

/* Income = payments actually received in the period (not invoices raised) */
$st = $pdo->prepare('SELECT COALESCE(SUM(amt),0) s FROM payments WHERE paid_on BETWEEN ? AND ?');
$st->execute([$from, $to]);
$income = (float)$st->fetch()['s'];

/* Salaries paid in the period */
$st = $pdo->prepare('SELECT COALESCE(SUM(basic+bonus-deductions),0) s FROM payroll WHERE status="Paid" AND paid_on BETWEEN ? AND ?');
$st->execute([$from, $to]);
$salaries = (float)$st->fetch()['s'];

try {
    $st = $pdo->prepare('SELECT COALESCE(SUM(amt),0) s FROM expenses WHERE spent_on BETWEEN ? AND ?');
    $st->execute([$from, $to]);
    $otherExpenses = (float)$st->fetch()['s'];
} catch (PDOException $e) {
    $otherExpenses = 0; // expenses table not migrated yet
}

/* Outstanding across all live invoices */
$rows = $pdo->query("
    SELECT i.id, i.currency, i.discount, i.status,
      COALESCE((SELECT SUM(qty*rate) FROM invoice_items x WHERE x.invoice_id=i.id),0) sub,
      COALESCE((SELECT SUM(amt) FROM payments p WHERE p.invoice_id=i.id),0) paid
    FROM invoices i WHERE i.status NOT IN ('Cancelled','Draft')")->fetchAll();

$outstanding = 0; $overdueCount = 0;
foreach ($rows as $r) {
    $due = max(0, ((float)$r['sub'] - (float)$r['discount']) - (float)$r['paid']);
    if ($r['currency'] === 'INR') $outstanding += $due;   // only base currency is summed
    if ($r['status'] === 'Overdue' && $due > 0) $overdueCount++;
}

$st = $pdo->prepare('SELECT COUNT(*) c FROM invoices WHERE status="Paid" AND invoice_date BETWEEN ? AND ?');
$st->execute([$from, $to]);
$paidInvoices = (int)$st->fetch()['c'];

/* Daily series for the chart */
$st = $pdo->prepare('SELECT paid_on d, SUM(amt) v FROM payments WHERE paid_on BETWEEN ? AND ? GROUP BY paid_on ORDER BY paid_on');
$st->execute([$from, $to]);
$incomeSeries = $st->fetchAll();

$st = $pdo->prepare('
    SELECT i.invoice_date d, SUM(COALESCE(x.sub,0) - i.discount) v
    FROM invoices i
    LEFT JOIN (SELECT invoice_id, SUM(qty*rate) sub FROM invoice_items GROUP BY invoice_id) x ON x.invoice_id=i.id
    WHERE i.invoice_date BETWEEN ? AND ? AND i.status <> "Cancelled"
    GROUP BY i.invoice_date ORDER BY i.invoice_date');
$st->execute([$from, $to]);
$invoiceSeries = $st->fetchAll();

/* Recent invoices */
$recent = $pdo->query("
    SELECT i.no, c.company AS client, i.status, i.currency, i.discount,
      COALESCE((SELECT SUM(qty*rate) FROM invoice_items x WHERE x.invoice_id=i.id),0) sub
    FROM invoices i JOIN clients c ON c.id=i.client_id
    ORDER BY i.invoice_date DESC, i.id DESC LIMIT 4")->fetchAll();

/* Upcoming / pending salaries this month */
$m = (int)date('n'); $y = (int)date('Y');
$st = $pdo->prepare('
    SELECT e.name, e.role, e.pay_date, p.basic+p.bonus-p.deductions AS amt
    FROM payroll p JOIN employees e ON e.id=p.emp_id
    WHERE p.status="Pending" AND p.month=? AND p.year=? ORDER BY e.pay_date LIMIT 5');
$st->execute([$m, $y]);
$upcoming = $st->fetchAll();

ok([
    'range'     => ['from' => $from, 'to' => $to],
    'kpi'       => [
        'income'       => $income,
        'expenses'     => $salaries + $otherExpenses,
        'profit'       => $income - $salaries - $otherExpenses,
        'outstanding'  => $outstanding,
        'overdueCount' => $overdueCount,
        'paidInvoices' => $paidInvoices,
    ],
    'pl'        => ['income' => $income, 'salaries' => $salaries, 'other' => $otherExpenses,
                    'expenses' => $salaries + $otherExpenses, 'profit' => $income - $salaries - $otherExpenses],
    'series'    => ['income' => $incomeSeries, 'invoices' => $invoiceSeries],
    'recent'    => $recent,
    'upcoming'  => $upcoming,
]);
