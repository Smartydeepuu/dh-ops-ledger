<?php
require_once __DIR__ . '/lib.php';
$u = need_auth();
$pdo = db();

const DOC_DIR      = __DIR__ . '/../storage/docs';
const DOC_MAX      = 10485760; // 10 MB
const DOC_CATS     = ['Legal', 'Finance', 'HR', 'Templates', 'Marketing', 'Other'];

/* $_POST is used for uploads (multipart), JSON body for everything else */
$action = $_POST['action'] ?? inp('action', 'list');

function ensure_dir() {
    if (!is_dir(DOC_DIR)) {
        if (!@mkdir(DOC_DIR, 0755, true) && !is_dir(DOC_DIR)) {
            fail('Storage folder could not be created. Create /storage/docs and make it writable.', 500);
        }
    }
    // keep the folder unreadable from the browser
    $ht = dirname(DOC_DIR) . '/.htaccess';
    if (!file_exists($ht)) @file_put_contents($ht, "Require all denied\n");
}

if ($action === 'list') {
    // The general Documents page only shows company-wide documents (not
    // tied to a specific client or employee). Client/Employee profile pages
    // ask for their own documents by passing client_id / employee_id.
    $clientId = (int)inp('client_id', 0);
    $employeeId = (int)inp('employee_id', 0);

    if ($clientId) {
        $st = $pdo->prepare('SELECT id, name, cat, size, uploaded_by, created_at FROM documents WHERE client_id=? ORDER BY created_at DESC, id DESC');
        $st->execute([$clientId]);
        $rows = $st->fetchAll();
    } elseif ($employeeId) {
        $st = $pdo->prepare('SELECT id, name, cat, size, uploaded_by, created_at FROM documents WHERE employee_id=? ORDER BY created_at DESC, id DESC');
        $st->execute([$employeeId]);
        $rows = $st->fetchAll();
    } else {
        $rows = $pdo->query('SELECT id, name, cat, size, uploaded_by, created_at FROM documents WHERE client_id IS NULL AND employee_id IS NULL ORDER BY created_at DESC, id DESC')->fetchAll();
    }

    ok(['documents' => array_map(function ($r) {
        return [
            'id' => (int)$r['id'], 'name' => $r['name'], 'cat' => $r['cat'],
            'size' => (int)$r['size'], 'by' => $r['uploaded_by'],
            'date' => substr((string)$r['created_at'], 0, 10),
        ];
    }, $rows)]);
}

if ($action === 'upload') {
    ensure_dir();

    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        $code = $_FILES['file']['error'] ?? -1;
        if ($code === UPLOAD_ERR_INI_SIZE || $code === UPLOAD_ERR_FORM_SIZE) {
            fail('That file is larger than the server allows.');
        }
        fail('No file was received.');
    }

    $tmp  = $_FILES['file']['tmp_name'];
    $size = (int)$_FILES['file']['size'];
    $orig = $_FILES['file']['name'];

    if ($size <= 0)        fail('The file is empty.');
    if ($size > DOC_MAX)   fail('File is too large. Maximum size is 10 MB.');

    // Trust the file's actual bytes, not its declared name or MIME type.
    // Checking the magic-number header directly avoids depending on the
    // fileinfo extension, which isn't always enabled on shared hosting.
    $header = @file_get_contents($tmp, false, null, 0, 5);
    if ($header !== "%PDF-") fail('Only PDF files can be uploaded.');
    $mime = 'application/pdf';

    $name = trim((string)($_POST['name'] ?? $orig));
    if ($name === '') $name = $orig;
    if (mb_strlen($name) > 180) $name = mb_substr($name, 0, 180);

    $cat = (string)($_POST['cat'] ?? 'Other');
    if (!in_array($cat, DOC_CATS, true)) $cat = 'Other';

    // Optional association — set from a client or employee profile upload.
    // Left NULL for the general company-wide Documents page.
    $clientId = isset($_POST['client_id']) && $_POST['client_id'] !== '' ? (int)$_POST['client_id'] : null;
    $employeeId = isset($_POST['employee_id']) && $_POST['employee_id'] !== '' ? (int)$_POST['employee_id'] : null;

    // stored name is random — the original name never touches the filesystem
    $stored = bin2hex(random_bytes(16)) . '.pdf';

    if (!move_uploaded_file($tmp, DOC_DIR . '/' . $stored)) {
        fail('Could not save the file. Check folder permissions on /storage/docs.', 500);
    }

    $st = $pdo->prepare('INSERT INTO documents (name, cat, filename, size, mime, uploaded_by, client_id, employee_id) VALUES (?,?,?,?,?,?,?,?)');
    $st->execute([$name, $cat, $stored, $size, $mime, $u['name'], $clientId, $employeeId]);
    $id = (int)$pdo->lastInsertId();

    if ($clientId) {
        log_activity('client', $clientId, "Document uploaded: $name", 'blue');
    } elseif ($employeeId) {
        log_activity('employee', $employeeId, "Document uploaded: $name", 'blue');
    } else {
        log_activity('document', $id, "Document uploaded: $name", 'blue');
    }
    ok(['id' => $id]);
}

if ($action === 'download') {
    $id = (int)inp('id', 0);
    $st = $pdo->prepare('SELECT * FROM documents WHERE id=?');
    $st->execute([$id]);
    $d = $st->fetch();
    if (!$d) fail('Document not found.', 404);

    $path = DOC_DIR . '/' . $d['filename'];
    if (!is_file($path)) fail('The file is missing from storage.', 404);

    // replace the JSON header set in lib.php
    header_remove('Content-Type');
    header('Content-Type: application/pdf');
    header('Content-Length: ' . filesize($path));
    header('Content-Disposition: inline; filename="' . str_replace('"', '', $d['name']) . '"');
    header('X-Content-Type-Options: nosniff');
    header('Cache-Control: private, max-age=0, must-revalidate');
    readfile($path);
    exit;
}

if ($action === 'rename') {
    $id   = (int)inp('id', 0);
    $name = trim((string)inp('name', ''));
    $cat  = (string)inp('cat', '');
    if ($name === '') fail('Name cannot be empty.');
    if (!in_array($cat, DOC_CATS, true)) $cat = 'Other';
    $pdo->prepare('UPDATE documents SET name=?, cat=? WHERE id=?')->execute([$name, $cat, $id]);
    ok();
}

if ($action === 'delete') {
    $id = (int)inp('id', 0);
    $st = $pdo->prepare('SELECT * FROM documents WHERE id=?');
    $st->execute([$id]);
    $d = $st->fetch();
    if (!$d) fail('Document not found.', 404);

    $path = DOC_DIR . '/' . $d['filename'];
    if (is_file($path)) @unlink($path);
    $pdo->prepare('DELETE FROM documents WHERE id=?')->execute([$id]);

    log_activity('document', $id, "Document deleted: {$d['name']}", 'red');
    ok();
}

fail('Unknown action.');
