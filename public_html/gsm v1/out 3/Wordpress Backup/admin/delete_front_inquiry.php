<?php
include '../include/db.php';
include 'auth_check.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM front_inquiries WHERE id = $id");
}
header("Location: user.php");
exit;
