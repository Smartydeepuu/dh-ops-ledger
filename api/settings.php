<?php
require_once __DIR__ . '/lib.php';
need_auth();
$pdo = db();
$action = inp('action', 'get');

/** Only these keys can ever be written. */
const ALLOWED = [
    'company_name', 'company_tagline', 'company_address', 'company_email',
    'company_phone', 'company_gstin', 'company_pan', 'company_website', 'company_bank',
    'invoice_prefix', 'invoice_terms', 'invoice_currency', 'invoice_footer',
    'salary_pay_date',
];

const DEFAULTS = [
    'company_name'    => 'Digital Hikers',
    'company_tagline' => 'Digital marketing & AI automation',
    'company_address' => 'Dhanbad · Bokaro, Jharkhand, India',
    'company_email'   => '',
    'company_phone'   => '',
    'company_gstin'   => '',
    'company_pan'     => '',
    'company_website' => '',
    'company_bank'    => '',
    'invoice_prefix'  => 'INV',
    'invoice_terms'   => 'Net 15',
    'invoice_currency'=> 'INR',
    'invoice_footer'  => 'Thank you for your business.',
    'salary_pay_date' => '20',
];

if ($action === 'get') {
    $rows = $pdo->query('SELECT skey, sval FROM settings')->fetchAll();
    $out = DEFAULTS;
    foreach ($rows as $r) {
        if (in_array($r['skey'], ALLOWED, true)) $out[$r['skey']] = (string)$r['sval'];
    }
    ok(['settings' => $out]);
}

if ($action === 'save') {
    $incoming = inp('settings', []);
    if (!is_array($incoming)) fail('Nothing to save.');

    $st = $pdo->prepare('INSERT INTO settings (skey, sval) VALUES (?,?) ON DUPLICATE KEY UPDATE sval=VALUES(sval)');
    $saved = 0;

    foreach ($incoming as $k => $v) {
        if (!in_array($k, ALLOWED, true)) continue;          // ignore anything unexpected
        $v = trim((string)$v);

        if ($k === 'invoice_currency' && !in_array($v, ['INR', 'USD', 'EUR', 'AUD'], true)) $v = 'INR';
        if ($k === 'invoice_prefix') {
            $v = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $v));
            if ($v === '') $v = 'INV';
        }
        if ($k === 'salary_pay_date') {
            $d = (int)$v;
            $v = (string)max(1, min(31, $d ?: 20));
        }
        if (mb_strlen($v) > 500) $v = mb_substr($v, 0, 500);

        $st->execute([$k, $v]);
        $saved++;
    }

    log_activity('settings', null, 'Settings updated', 'amber');

    $rows = $pdo->query('SELECT skey, sval FROM settings')->fetchAll();
    $out = DEFAULTS;
    foreach ($rows as $r) {
        if (in_array($r['skey'], ALLOWED, true)) $out[$r['skey']] = (string)$r['sval'];
    }
    ok(['saved' => $saved, 'settings' => $out]);
}

fail('Unknown action.');
