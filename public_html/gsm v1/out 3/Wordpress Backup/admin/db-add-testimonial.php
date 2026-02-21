<?php include("./header.php"); ?>

<?php
include("../include/db.php");
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $name = $_POST['name'] ?? '';
    $designation = $_POST['designation'] ?? '';
    $description = $_POST['description'] ?? '';
    $image = '';

    // Image Upload
    if (!empty($_FILES['myfile']['name']) && $_FILES['myfile']['error'] === UPLOAD_ERR_OK) {
        $imageName = basename($_FILES['myfile']['name']);
        $uploadDir = "uploads/testimonials/";
        $targetFile = $uploadDir . $imageName;

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        if (move_uploaded_file($_FILES['myfile']['tmp_name'], $targetFile)) {
            $image = $targetFile;
        } else {
            echo "<p style='color:red;'>❌ Failed to upload image.</p>";
        }
    }

    // Insert into DB
    $stmt = $conn->prepare("INSERT INTO testimonials (name, designation, description, image) VALUES (?, ?, ?, ?)");
    if ($stmt === false) {
        echo "<p style='color:red;'>❌ Prepare failed: " . htmlspecialchars($conn->error) . "</p>";
    } else {
        $stmt->bind_param("ssss", $name, $designation, $description, $image);
        if ($stmt->execute()) {
            echo "<p style='color:green;'>✅ Testimonial added successfully!</p>";
        } else {
            echo "<p style='color:red;'>❌ Error: " . htmlspecialchars($stmt->error) . "</p>";
        }
        $stmt->close();
    }
}
?>

<div class="db-info-wrap db-add-tour-wrap">
    <form method="POST" enctype="multipart/form-data">
        <div class="dashboard-box">
            <div class="custom-field-wrap">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Designation</label>
                    <input type="text" name="designation" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label>Upload Image</label>
                    <input type="file" name="myfile" required>
                </div>
                <div class="form-group mt-3">
                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </form>
</div>

<div class="copyrights">
    Copyright © 2025 Codewebzz. All rights reserved.
</div>