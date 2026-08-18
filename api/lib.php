<?php
require_once __DIR__ . '/config.php';

// Never let a stray PHP warning/notice leak into what must be pure JSON —
// that's what turns into "Server returned an unexpected response" on the
// frontend. Convert warnings into exceptions we can catch, and if something
// truly fatal happens, still respond with valid JSON instead of an HTML
// error page.
ini_set('display_errors', '0');
error_reporting(E_ALL);

set_error_handler(function ($no, $str, $file, $line) {
    if (!(error_reporting() & $no)) return false;
    throw new ErrorException($str, 0, $no, $file, $line);
});

register_shutdown_function(function () {
    $e = error_get_last();
    if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        if (!headers_sent()) {
            header_remove();
            header('Content-Type: application/json; charset=utf-8');
            http_response_code(500);
        }
        echo json_encode(['ok' => false, 'error' => 'Server error. Please try again.']);
    }
});

session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax']);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function db() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4',
                DB_USER, DB_PASS, [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ]);
        } catch (PDOException $e) {
            fail('Database connection failed. Check api/config.php.', 500);
        }
    }
    return $pdo;
}

function body() {
    static $b = null;
    if ($b === null) {
        $raw = file_get_contents('php://input');
        $b = json_decode($raw, true);
        if (!is_array($b)) $b = [];
    }
    return $b;
}

function inp($key, $default = null) {
    $b = body();
    if (array_key_exists($key, $b)) return $b[$key];
    if (isset($_GET[$key])) return $_GET[$key];
    return $default;
}

function ok($data = []) { echo json_encode(['ok' => true] + $data); exit; }

function fail($msg, $code = 400) {
    http_response_code($code);
    echo json_encode(['ok' => false, 'error' => $msg]);
    exit;
}

function me() { return $_SESSION['user'] ?? null; }

function need_auth() {
    if (!me()) fail('Not signed in.', 401);
    return me();
}

function log_activity($entity, $entityId, $bodyText, $tone = 'indigo') {
    $u = me();
    $st = db()->prepare('INSERT INTO activity_log (entity, entity_id, body, tone, author) VALUES (?,?,?,?,?)');
    $st->execute([$entity, $entityId, $bodyText, $tone, $u['name'] ?? 'System']);
}

function num($v) { return round((float)$v, 2); }

/** Recalculate an invoice's status from its payments (never downgrades a manual Cancelled/Draft). */
function invoice_auto_status($invoiceId) {
    $pdo = db();
    $inv = $pdo->prepare('SELECT * FROM invoices WHERE id=?');
    $inv->execute([$invoiceId]);
    $i = $inv->fetch();
    if (!$i) return null;
    if ($i['status'] === 'Cancelled') return $i['status'];

    $it = $pdo->prepare('SELECT COALESCE(SUM(qty*rate),0) s FROM invoice_items WHERE invoice_id=?');
    $it->execute([$invoiceId]);
    $subtotal = (float)$it->fetch()['s'];
    $total = max(0, $subtotal - (float)$i['discount']);

    $pm = $pdo->prepare('SELECT COALESCE(SUM(amt),0) s FROM payments WHERE invoice_id=?');
    $pm->execute([$invoiceId]);
    $paid = (float)$pm->fetch()['s'];

    if ($paid <= 0) {
        $overdue = $i['due_date'] && $i['due_date'] < date('Y-m-d');
        $status = $overdue ? 'Overdue' : ($i['status'] === 'Sent' ? 'Sent' : 'Pending');
    } elseif ($paid + 0.01 < $total) {
        $status = 'Partially Paid';
    } else {
        $status = 'Paid';
    }

    $pdo->prepare('UPDATE invoices SET status=? WHERE id=?')->execute([$status, $invoiceId]);
    return $status;
}
function get_fx_rates() {
    $cacheFile = __DIR__ . '/../storage/fx_rates.json';
    $maxAge = 6 * 3600;

    $cached = null;
    if (file_exists($cacheFile)) {
        $cached = json_decode(file_get_contents($cacheFile), true);
        if ($cached && isset($cached['fetched_at']) && (time() - $cached['fetched_at']) < $maxAge) {
            return $cached['rates'];
        }
    }

    $rates = null;
    $ctx = stream_context_create(['http' => ['timeout' => 4]]);
    $raw = @file_get_contents('https://open.er-api.com/v6/latest/USD', false, $ctx);
    if ($raw) {
        $data = json_decode($raw, true);
        if (isset($data['rates']) && is_array($data['rates'])) $rates = $data['rates'];
    }

    if ($rates) {
        @file_put_contents($cacheFile, json_encode(['fetched_at' => time(), 'rates' => $rates]));
        return $rates;
    }

    if ($cached && isset($cached['rates'])) return $cached['rates'];

    return ['USD' => 1, 'INR' => 87, 'EUR' => 0.92, 'AUD' => 1.5];
}

function to_inr($amount, $currency, $rates) {
    $currency = strtoupper($currency ?: 'INR');
    if ($currency === 'INR') return (float)$amount;
    if (!isset($rates[$currency]) || !isset($rates['INR']) || $rates[$currency] == 0) return (float)$amount;
    return (float)$amount * ($rates['INR'] / $rates[$currency]);
}