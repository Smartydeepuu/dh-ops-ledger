<?php
require_once __DIR__ . '/lib.php';
$u = need_auth();
$pdo = db();
$action = inp('action', 'list');

function payroll_rows($pdo) {
    $rows = $pdo->query('SELECT * FROM payroll ORDER BY year DESC, month DESC, id DESC')->fetchAll();
    return array_map(function ($r) {
        return [
            'id' => (int)$r['id'], 'empId' => (int)$r['emp_id'],
            'month' => (int)$r['month'], 'year' => (int)$r['year'],
            'basic' => (float)$r['basic'], 'bonus' => (float)$r['bonus'],
            'deductions' => (float)$r['deductions'], 'status' => $r['status'],
            'paidOn' => $r['paid_on'], 'method' => $r['method'], 'ref' => $r['ref'],
        ];
    }, $rows);
}

if ($action === 'list') ok(['payroll' => payroll_rows($pdo)]);

if ($action === 'create') {
    $empId = (int)inp('empId', 0);
    $month = (int)inp('month', 0);
    $year  = (int)inp('year', 0);
    if (!$empId || $month < 1 || $month > 12 || !$year) fail('Pick an employee, month and year.');

    $st = $pdo->prepare('SELECT id FROM payroll WHERE emp_id=? AND month=? AND year=?');
    $st->execute([$empId, $month, $year]);
    if ($st->fetch()) fail('A slip already exists for that employee and month.');

    $pdo->prepare('INSERT INTO payroll (emp_id, month, year, basic, bonus, deductions, status) VALUES (?,?,?,?,?,?,"Pending")')
        ->execute([$empId, $month, $year, num(inp('basic', 0)), num(inp('bonus', 0)), num(inp('deductions', 0))]);
    $id = (int)$pdo->lastInsertId();
    log_activity('payroll', $id, 'Salary slip generated', 'indigo');
    ok(['id' => $id, 'payroll' => payroll_rows($pdo)]);
}

if ($action === 'update') {
    $id = (int)inp('id', 0);
    if (!$id) fail('Missing id.');
    $pdo->prepare('UPDATE payroll SET basic=?, bonus=?, deductions=? WHERE id=?')
        ->execute([num(inp('basic', 0)), num(inp('bonus', 0)), num(inp('deductions', 0)), $id]);
    ok(['payroll' => payroll_rows($pdo)]);
}

if ($action === 'mark_paid') {
    $id = (int)inp('id', 0);
    if (!$id) fail('Missing id.');
    $pdo->prepare('UPDATE payroll SET status="Paid", paid_on=?, method=?, ref=? WHERE id=?')
        ->execute([inp('paidOn') ?: date('Y-m-d'), (string)inp('method', ''), (string)inp('ref', ''), $id]);
    log_activity('payroll', $id, 'Salary marked as paid', 'green');
    ok(['payroll' => payroll_rows($pdo)]);
}

if ($action === 'delete') {
    $id = (int)inp('id', 0);
    $pdo->prepare('DELETE FROM payroll WHERE id=?')->execute([$id]);
    ok(['payroll' => payroll_rows($pdo)]);
}

fail('Unknown action.');
