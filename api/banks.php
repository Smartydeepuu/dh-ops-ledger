<?php
require_once __DIR__ . '/lib.php';
need_auth();
$pdo = db();
$action = inp('action', 'list');

if ($action === 'list') {
    $rows = $pdo->query('SELECT * FROM bank_accounts ORDER BY is_default DESC, label')->fetchAll();
    ok(['banks' => array_map(function ($b) {
        return [
            'id' => (int)$b['id'],
            'label' => $b['label'],
            'bankName' => $b['bank_name'],
            'accountNo' => $b['account_no'],
            'ifsc' => $b['ifsc'],
            'branch' => $b['branch'],
            'swift' => $b['swift'],
            'extra' => $b['extra'],
            'isDefault' => (int)$b['is_default'] === 1,
        ];
    }, $rows)]);
}

if ($action === 'save') {
    $id        = (int)inp('id', 0);
    $label     = trim((string)inp('label', ''));
    $bankName  = trim((string)inp('bankName', ''));
    $accountNo = trim((string)inp('accountNo', ''));
    $ifsc      = trim((string)inp('ifsc', ''));
    $branch    = trim((string)inp('branch', ''));
    $swift     = trim((string)inp('swift', ''));
    $extra     = trim((string)inp('extra', ''));
    $isDefault = inp('isDefault', false) ? 1 : 0;

    if ($label === '') fail('Give this account a name, e.g. "Indian clients" or "Foreign clients".');

    if ($isDefault) $pdo->exec('UPDATE bank_accounts SET is_default=0');

    if ($id) {
        $pdo->prepare('UPDATE bank_accounts SET label=?, bank_name=?, account_no=?, ifsc=?, branch=?, swift=?, extra=?, is_default=? WHERE id=?')
            ->execute([$label, $bankName, $accountNo, $ifsc, $branch, $swift, $extra, $isDefault, $id]);
    } else {
        $pdo->prepare('INSERT INTO bank_accounts (label, bank_name, account_no, ifsc, branch, swift, extra, is_default) VALUES (?,?,?,?,?,?,?,?)')
            ->execute([$label, $bankName, $accountNo, $ifsc, $branch, $swift, $extra, $isDefault]);
        $id = (int)$pdo->lastInsertId();
    }

    // Never leave the list without a default — invoices fall back to it.
    $hasDefault = (int)$pdo->query('SELECT COUNT(*) c FROM bank_accounts WHERE is_default=1')->fetch()['c'];
    if (!$hasDefault) $pdo->prepare('UPDATE bank_accounts SET is_default=1 WHERE id=?')->execute([$id]);

    ok(['id' => $id]);
}

if ($action === 'delete') {
    $id = (int)inp('id', 0);
    $pdo->prepare('DELETE FROM bank_accounts WHERE id=?')->execute([$id]);
    // Invoices pointing at it keep working — bank_account_id just goes stale
    // and the invoice falls back to the default account.
    $hasDefault = (int)$pdo->query('SELECT COUNT(*) c FROM bank_accounts WHERE is_default=1')->fetch()['c'];
    if (!$hasDefault) $pdo->exec('UPDATE bank_accounts SET is_default=1 ORDER BY id LIMIT 1');
    ok();
}

fail('Unknown action.');
