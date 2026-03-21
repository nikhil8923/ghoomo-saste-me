<?php include("./header.php");

include("../include/db.php");

$id = intval($_GET['id'] ?? 0);
$testimonials = $conn->query("SELECT * FROM testimonials WHERE id = $id")->fetch_assoc();

if (!$testimonials) {
    die("<p style='color:red;'>Testimonial not found.</p>");
}

// Handle update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
    $name = $_POST['name'];
    $designation = $_POST['designation'];
    $description = $_POST['description'];
    $image = $testimonials['image'];

    // Handle image upload if a new file is selected
    if (!empty($_FILES['myfile']['name']) && $_FILES['myfile']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "uploads/testimonialsGallery/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $newImage = $uploadDir . basename($_FILES['myfile']['name']);
        if (move_uploaded_file($_FILES['myfile']['tmp_name'], $newImage)) {
            $image = $newImage;
        }
    }

    $stmt = $conn->prepare("UPDATE testimonials SET name=?, designation=?, description=?, image=? WHERE id=?");
    $stmt->bind_param("ssssi", $name, $designation, $description, $image, $id);

    if ($stmt->execute()) {
        echo "<p style='color:green;'>✅ Testimonial updated successfully!</p>";
        $testimonials = $conn->query("SELECT * FROM testimonials WHERE id = $id")->fetch_assoc(); // Refresh
    } else {
        echo "<p style='color:red;'>❌ Error updating testimonial: " . $stmt->error . "</p>";
    }

    $stmt->close();
}
?>

<!-- Update Form -->
<div class="db-info-wrap db-add-tour-wrap">
    <form method="POST" enctype="multipart/form-data">
        <div class="form-group">
            <label>Testimonial Name</label>
            <input type="text" name="name" value="<?= htmlspecialchars($testimonials['name']) ?>" required>
        </div>
        <div class="form-group">
            <label>Designation</label>
            <input type="text" name="designation" value="<?= htmlspecialchars($testimonials['designation']) ?>" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" required><?= htmlspecialchars($testimonials['description']) ?></textarea>
        </div>
        <div class="form-group">
            <label>Current Image</label><br>
            <img src="<?= $testimonials['image'] ?>" width="100" height="100" alt="Testimonial Image"><br><br>
            <label>Change Image</label>
            <input type="file" name="myfile">
        </div>
        <button type="submit" name="update" class="btn btn-primary">Update Testimonial</button>
    </form>
</div>