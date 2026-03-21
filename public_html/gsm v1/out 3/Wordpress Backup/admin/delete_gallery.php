<?php
include("../include/db.php");

$id = $_GET['id'] ?? null;

if ($id) {
    // Get the image name first
    $result = $conn->query("SELECT image FROM gallery WHERE id = $id");
    $row = $result->fetch_assoc();

    if ($row && $row['image']) {
        $imagePath = "../uploads/gallery" . $row['image'];
        if (file_exists($imagePath)) {
            unlink($imagePath); // delete image file
        }
    }

    // Delete from database
    $delete = $conn->prepare("DELETE FROM gallery WHERE id = ?");
    $delete->bind_param("i", $id);
    $delete->execute();
}

header("Location: gellery-list.php"); // redirect to your list page
exit;
