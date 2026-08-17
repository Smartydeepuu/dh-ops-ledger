<?php
/**
 * ONE-TIME SETUP — creates your admin account.
 * Open in a browser, create the account, then DELETE this file from the server.
 */
require_once __DIR__ . '/api/config.php';
session_start();

try {
    $pdo = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
} catch (PDOException $e) {
    die('<p style="font-family:sans-serif;padding:2rem">Database connection failed. Check <b>api/config.php</b>.</p>');
}

try {
    $count = (int)$pdo->query('SELECT COUNT(*) c FROM users')->fetch()['c'];
} catch (Exception $e) {
    die('<p style="font-family:sans-serif;padding:2rem">Tables not found. Import <b>api/schema.sql</b> in phpMyAdmin first.</p>');
}

if ($count > 0) {
    die('<p style="font-family:sans-serif;padding:2rem">An account already exists. Please <b>delete setup.php</b> from the server and open the app.</p>');
}

$done = false; $error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $user = trim($_POST['username'] ?? '');
    $pass = $_POST['password'] ?? '';
    if ($name === '' || $user === '' || strlen($pass) < 8) {
        $error = 'All fields required. Password must be at least 8 characters.';
    } else {
        $pdo->prepare('INSERT INTO users (name, username, password_hash, role) VALUES (?,?,?,"admin")')
            ->execute([$name, $user, password_hash($pass, PASSWORD_DEFAULT)]);
        $done = true;
    }
}
?><!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Setup — Digital Hikers</title>
<style>
 body{font-family:Inter,system-ui,sans-serif;background:#0F172A;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:16px}
 .box{background:#fff;border-radius:18px;padding:26px;width:100%;max-width:400px}
 h1{font-size:19px;margin:0 0 4px} p.s{color:#64748B;font-size:13.5px;margin:0 0 18px}
 input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #E2E8F0;border-radius:10px;font-size:15px;margin-bottom:12px}
 button,a.btn{display:block;width:100%;box-sizing:border-box;text-align:center;padding:13px;border:0;border-radius:12px;background:#C2410C;color:#fff;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none}
 .err{color:#DC2626;font-size:13px;margin-bottom:10px}
</style></head><body><div class="box">
<?php if ($done): ?>
  <h1>Admin account created</h1>
  <p class="s">Now <b>delete setup.php</b> from your server, then sign in.</p>
  <a class="btn" href="index.html">Open the app</a>
<?php else: ?>
  <h1>Create admin account</h1>
  <p class="s">This runs once. Delete this file afterwards.</p>
  <form method="post">
    <input name="name" placeholder="Your name" required>
    <input name="username" placeholder="Username" required autocomplete="off">
    <input type="password" name="password" placeholder="Password (min 8 characters)" required>
    <?php if ($error): ?><div class="err"><?= htmlspecialchars($error) ?></div><?php endif; ?>
    <button>Create account</button>
  </form>
<?php endif; ?>
</div></body></html>
