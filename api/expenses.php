<?php
require_once __DIR__ . '/lib.php';
$u = need_auth();
$pdo = db();
$action = inp('action', 'list');

const EXP_CATS    = ['Software', 'Hosting', 'Advertising', 'Freelancer', 'Office', 'Equipment', 'Travel', 'Other'];
const EXP_METHODS = ['Bank Transfer', 'UPI', 'Card', 'Cash', 'Cheque', 'Other'];

function exp_rows($pdo) {
    $rows = $pdo->query('SELECT * FROM expenses ORDER BY spent_on DESC, id DESC')->fetchAll();
    return array_map(function ($r) {
        return [
            'id' => (int)$r['id'], 'name' => $r['name'], 'cat' => $r['cat'],
            'amt' => (float)$r['amt'], 'date' => $r['spent_on'],
            'method' => $r['method'], 'notes' => $r['notes'], 'receipt' => $r['receipt'],
        ];
    }, $rows);
}

if ($action === 'list') ok(['expenses' => exp_rows($pdo)]);

if ($action === 'save') {
    $id     = (int)inp('id', 0);
    $name   = trim((string)inp('name', ''));
    $amt    = num(inp('amt', 0));
    $date   = inp('date') ?: date('Y-m-d');
    $cat    = (string)inp('cat', 'Other');
    $method = (string)inp('method', 'Other');
    $notes  = (string)inp('notes', '');

    if ($name === '') fail('Give the expense a name.');
    if ($amt <= 0)    fail('Enter an amount greater than zero.');
    if (!in_array($cat, EXP_CATS, true))       $cat = 'Other';
    if (!in_array($method, EXP_METHODS, true)) $method = 'Other';

    if ($id) {
        $pdo->prepare('UPDATE expenses SET name=?, cat=?, amt=?, spent_on=?, method=?, notes=? WHERE id=?')
            ->execute([$name, $cat, $amt, $date, $method, $notes, $id]);
        log_activity('expense', $id, "Expense updated: $name", 'amber');
    } else {
        $pdo->prepare('INSERT INTO expenses (name, cat, amt, spent_on, method, notes, created_by) VALUES (?,?,?,?,?,?,?)')
            ->execute([$name, $cat, $amt, $date, $method, $notes, $u['name']]);
        $id = (int)$pdo->lastInsertId();
        log_activity('expense', $id, "Expense added: $name", 'red');
    }

    ok(['id' => $id, 'expenses' => exp_rows($pdo)]);
}

if ($action === 'delete') {
    $id = (int)inp('id', 0);
    $st = $pdo->prepare('SELECT name, receipt FROM expenses WHERE id=?');
    $st->execute([$id]);
    $e = $st->fetch();
    if ($e && $e['receipt']) {
        $path = __DIR__ . '/../storage/docs/' . basename($e['receipt']);
        if (is_file($path)) @unlink($path);
    }
    $pdo->prepare('DELETE FROM expenses WHERE id=?')->execute([$id]);
    log_activity('expense', $id, 'Expense deleted: ' . ($e['name'] ?? ''), 'red');
    ok(['expenses' => exp_rows($pdo)]);
}

fail('Unknown action.');
