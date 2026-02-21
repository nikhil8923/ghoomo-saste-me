<?php include("./header.php"); ?>

<?php
include("../include/db.php");

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $name = $_POST['name'] ?? '';
    $designation = $_POST['designation'] ?? '';
    $description = $_POST['description'] ?? '';
    $facebook_link = $_POST['facebook_link'] ?? '';
    $instagram_link = $_POST['instagram_link'] ?? '';
    $image = '';

    // Handle File Upload
    if (!empty($_FILES['myfile']['name']) && $_FILES['myfile']['error'] === UPLOAD_ERR_OK) {
        $imageName = basename($_FILES['myfile']['name']);
        $uploadDir = "uploads/hostGallery/";
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
    $stmt = $conn->prepare("INSERT INTO hosts (name, designation, description, image, facebook_link, instagram_link) VALUES (?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        echo "<p style='color:red;'>❌ Prepare failed: " . htmlspecialchars($conn->error) . "</p>";
    } else {
        $stmt->bind_param("ssssss", $name, $designation, $description, $image, $facebook_link, $instagram_link);
        if ($stmt->execute()) {
            echo "<p style='color:green;'>✅ Host added successfully!</p>";
        } else {
            echo "<p style='color:red;'>❌ Error: " . htmlspecialchars($stmt->error) . "</p>";
        }
        $stmt->close();
    }
}
?>

<!-- HTML FORM -->
<div class="db-info-wrap db-add-tour-wrap">
    <form method="POST" enctype="multipart/form-data">
        <div class="row">
            <div class="col-lg-12 col-xl-12">
                <div class="dashboard-box">
                    <div class="custom-field-wrap">
                        <div class="form-group">
                            <label>Host Name</label>
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
                            <label>Facebook Profile Link</label>
                            <input type="url" name="facebook_link" placeholder="https://facebook.com/username">
                        </div>

                        <div class="form-group">
                            <label>Instagram Profile Link</label>
                            <input type="url" name="instagram_link" placeholder="https://instagram.com/username">
                        </div>
                    </div>
                </div>

                <div class="dashboard-box">
                    <h4>Upload Host Image</h4>
                    <div class="custom-field-wrap">
                        <div class="dragable-field">
                            <div class="dragable-field-inner">
                                <p class="drag-drop-info">Drop Files To Upload</p>
                                <p>or</p>
                                <div class="upload-input">
                                    <div class="form-group">
                                        <span class="upload-btn">Upload an image</span>
                                        <input type="file" name="myfile" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

<!-- Scripts -->
<script src="assets/js/jquery-3.2.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/canvasjs.min.js"></script>
<script src="assets/js/counterup.min.js"></script>
<script src="assets/js/jquery.slicknav.js"></script>
<script src="assets/js/dashboard-custom.js"></script>