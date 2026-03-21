<?php
include '../include/db.php';
include './include/auth.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM service_questions WHERE id = $id");
}
header("Location: user2.php");
exit;
