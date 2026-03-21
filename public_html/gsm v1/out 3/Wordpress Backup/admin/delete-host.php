<?php
include("../include/db.php");

$id = $_GET['id'] ?? 0;

// Optional: delete associated image file
$result = $conn->query("SELECT image FROM hosts WHERE id = $id");
if ($row = $result->fetch_assoc()) {
    if (file_exists($row['image'])) {
        unlink($row['image']);
    }
}

$conn->query("DELETE FROM hosts WHERE id = $id");
header("Location: db-host-list.php"); // Adjust to your list page
exit;
