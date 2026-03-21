<?php
include '../include/db.php';
include './include/auth.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM contact_messages WHERE id = $id");
}
header("Location: user3.php"); // Replace with your actual file name
exit;
