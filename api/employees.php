<?php
require_once __DIR__ . '/lib.php';
$u = need_auth();
$pdo = db();
$action = inp('action', 'list');

if ($action === 'list') {
    $rows = $pdo->query('SELECT * FROM employees ORDER BY status, name')->fetchAll();
    foreach ($rows as &$r) {
        $r['id'] = (int)$r['id'];
        $r['salary'] = (float)$r['salary'];
        $r['joinDate'] = $r['join_date'];
        $r['payDate'] = (int)$r['pay_date'];
        $r['salaryType'] = $r['salary_type'];
        $s = $pdo->prepare('SELECT month, year, basic FROM payroll WHERE emp_id=? ORDER BY year DESC, month DESC LIMIT 12');
        $s->execute([$r['id']]);
        $r['history'] = $s->fetchAll();

        $d = $pdo->prepare('SELECT id, name, cat, size, uploaded_by, created_at FROM documents WHERE employee_id=? ORDER BY created_at DESC, id DESC');
        $d->execute([$r['id']]);
        $r['documents'] = array_map(function ($doc) {
            return [
                'id' => (int)$doc['id'], 'name' => $doc['name'], 'cat' => $doc['cat'],
                'size' => (int)$doc['size'], 'by' => $doc['uploaded_by'],
                'date' => substr((string)$doc['created_at'], 0, 10),
            ];
        }, $d->fetchAll());
    }
    ok(['employees' => $rows]);
}

if ($action === 'create' || $action === 'update') {
    $f = [
        trim((string)inp('name', '')), trim((string)inp('email', '')), trim((string)inp('phone', '')),
        trim((string)inp('role', '')), trim((string)inp('dept', '')), num(inp('salary', 0)),
        (string)inp('salaryType', 'Monthly'), (int)inp('payDate', 20),
        inp('joinDate') ?: null, trim((string)inp('address', '')), trim((string)inp('bank', '')),
        trim((string)inp('notes', '')), inp('status', 'Active') === 'Inactive' ? 'Inactive' : 'Active',
    ];
    if ($f[0] === '') fail('Name is required.');

    if ($action === 'create') {
        $pdo->prepare('INSERT INTO employees (name,email,phone,role,dept,salary,salary_type,pay_date,join_date,address,bank,notes,status)
                       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)')->execute($f);
        $id = (int)$pdo->lastInsertId();
        log_activity('employee', $id, 'Employee added', 'indigo');
        ok(['id' => $id]);
    }

    $id = (int)inp('id', 0);
    if (!$id) fail('Missing id.');
    $f[] = $id;
    $pdo->prepare('UPDATE employees SET name=?,email=?,phone=?,role=?,dept=?,salary=?,salary_type=?,pay_date=?,join_date=?,address=?,bank=?,notes=?,status=? WHERE id=?')
        ->execute($f);
    log_activity('employee', $id, 'Employee updated', 'amber');
    ok();
}

if ($action === 'delete') {
    $id = (int)inp('id', 0);
    $pdo->prepare('DELETE FROM employees WHERE id=?')->execute([$id]);
    log_activity('employee', $id, 'Employee removed', 'red');
    ok();
}

fail('Unknown action.');
