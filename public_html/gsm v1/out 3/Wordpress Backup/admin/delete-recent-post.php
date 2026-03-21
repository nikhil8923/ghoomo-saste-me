<?php
include("../include/db.php");

if (!isset($_GET['id'])) {
    echo "Invalid request.";
    exit;
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM blog_posts WHERE id = $id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) === 1) {
    $row = mysqli_fetch_assoc($result);

    // Delete image from server
    if (!empty($row['image']) && file_exists("../uploads/" . $row['image'])) {
        unlink("../uploads/" . $row['image']);
    }

    // Delete from DB
    $deleteSql = "DELETE FROM blog_posts WHERE id = $id";
    if (mysqli_query($conn, $deleteSql)) {
        echo "<script>alert('Post deleted successfully'); window.location='recent-post-list.php';</script>";
    } else {
        echo "Delete failed: " . mysqli_error($conn);
    }
} else {
    echo "Post not found.";
}
