<?php include("./header.php"); ?>

<?php
// DB Connection
include("../include/db.php");
// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $title = $_POST['name'] ?? '';

    // Handle File Upload
    $image = '';
    if (!empty($_FILES['myfile']['name']) && $_FILES['myfile']['error'] === UPLOAD_ERR_OK) {
        $image = basename($_FILES['myfile']['name']);
        $target = "uploads/gallery/" . $image; // ✅ Corrected line

        // Create uploads/gallery folder if not exists
        if (!is_dir("uploads/gallery")) {
            mkdir("uploads/gallery", 0755, true);
        }

        if (!move_uploaded_file($_FILES['myfile']['tmp_name'], $target)) {
            echo "<p style='color:red;'>❌ Failed to upload image.</p>";
            $image = '';
        }
    }

    // Insert into gallery table
    $stmt = $conn->prepare("INSERT INTO gallery (title, image) VALUES (?, ?)");
    if ($stmt === false) {
        echo "<p style='color:red;'>❌ Prepare failed: " . htmlspecialchars($conn->error) . "</p>";
    } else {
        $stmt->bind_param("ss", $title, $image);

        if ($stmt->execute()) {
            echo "<p style='color:green;'>✅ Image added to gallery successfully!</p>";
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
                            <label>Title</label>
                            <input type="text" name="name" required>
                        </div>
                    </div>
                </div>

                <div class="dashboard-box">
                    <h4>Upload Image</h4>
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