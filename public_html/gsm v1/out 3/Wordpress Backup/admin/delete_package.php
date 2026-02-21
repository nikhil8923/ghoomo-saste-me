<?php
include("../include/db.php");

if (isset($_GET['id'])) {
    $id = $_GET['id'];

    // Optional: delete image file from uploads folder
    $result = mysqli_query($conn, "SELECT image FROM packages WHERE id = $id");
    $row = mysqli_fetch_assoc($result);
    if ($row && file_exists("uploads/" . $row['image'])) {
        unlink("uploads/" . $row['image']);
    }

    $sql = "DELETE FROM packages WHERE id = $id";
    if (mysqli_query($conn, $sql)) {
        header("Location: db-package-list.php");
        exit();
    } else {
        echo "Error deleting record: " . mysqli_error($conn);
    }
} else {
    echo "Invalid ID.";
}
