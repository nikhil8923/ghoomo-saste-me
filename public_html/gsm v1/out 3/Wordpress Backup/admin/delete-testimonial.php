<?php
include("../include/db.php");
$id = intval($_GET['id'] ?? 0);

// Fetch and delete image file
$result = $conn->query("SELECT image FROM testimonials WHERE id = $id");
if ($result && $row = $result->fetch_assoc()) {
    $imagePath = $row['image'];
    if (file_exists($imagePath)) {
        unlink($imagePath); // delete image file
    }
}

// Delete testimonial
$stmt = $conn->prepare("DELETE FROM testimonials WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo "<script>alert('✅ Testimonial deleted successfully'); window.location.href='list-testimonial.php';</script>";
} else {
    echo "<script>alert('❌ Failed to delete testimonial'); window.location.href='list-testimonial.php';</script>";
}

$stmt->close();
$conn->close();
