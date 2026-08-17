<?php
require_once __DIR__ . '/lib.php';

$action = inp('action', 'me');

if ($action === 'me') {
    $u = me();
    if (!$u) fail('Not signed in.', 401);
    ok(['user' => $u]);
}

if ($action === 'login') {
    $username = trim((string)inp('username', ''));
    $password = (string)inp('password', '');
    if ($username === '' || $password === '') fail('Enter username and password.');

    // simple brute-force slowdown
    usleep(300000);

    $st = db()->prepare('SELECT * FROM users WHERE username=? LIMIT 1');
    $st->execute([$username]);
    $u = $st->fetch();

    if (!$u || !password_verify($password, $u['password_hash'])) {
        fail('Incorrect username or password.', 401);
    }

    session_regenerate_id(true);
    $_SESSION['user'] = ['id' => (int)$u['id'], 'name' => $u['name'], 'username' => $u['username'], 'role' => $u['role']];
    ok(['user' => $_SESSION['user']]);
}

if ($action === 'logout') {
    $_SESSION = [];
    session_destroy();
    ok();
}

if ($action === 'change_password') {
    $u = need_auth();
    $current = (string)inp('current', '');
    $next    = (string)inp('next', '');
    if (strlen($next) < 8) fail('New password must be at least 8 characters.');

    $st = db()->prepare('SELECT password_hash FROM users WHERE id=?');
    $st->execute([$u['id']]);
    $row = $st->fetch();
    if (!$row || !password_verify($current, $row['password_hash'])) fail('Current password is wrong.');

    db()->prepare('UPDATE users SET password_hash=? WHERE id=?')
        ->execute([password_hash($next, PASSWORD_DEFAULT), $u['id']]);
    ok();
}

fail('Unknown action.');
