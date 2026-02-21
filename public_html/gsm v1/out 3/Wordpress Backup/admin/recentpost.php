<?php
// Connect to the database
include($_SERVER['DOCUMENT_ROOT']."/include/db.php");

// Check if form is submitted
if (isset($_POST['submit'])) {
    $title = $_POST['name'];
    $team = $_POST['size'];
    $date = $_POST['days'];
    $comment = $_POST['comment'];

    // File upload
    $image_name = $_FILES['myfile']['name'];
    $temp_name = $_FILES['myfile']['tmp_name'];
    $upload_dir = "uploads/";

    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $image_path = $upload_dir . basename($image_name);

    if (move_uploaded_file($temp_name, $image_path)) {
        $stmt = $conn->prepare("INSERT INTO blog_posts (title, image, author, date, comments_count) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssi", $title, $image_name, $team, $date, $comment);

        if ($stmt->execute()) {
            echo "<script>alert('Blog post added successfully');</script>";
        } else {
            echo "<script>alert('Database error: " . $conn->error . "');</script>";
        }
    } else {
        echo "<script>alert('Failed to upload image');</script>";
    }
}
?>

<?php include("./header.php"); ?>

<!-- HTML FORM -->
<div class="db-info-wrap db-add-tour-wrap">
    <form method="POST" enctype="multipart/form-data">
        <h1 class="text-center">Recent Post</h1>
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
                    <div class="custom-field-wrap">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Team</label>
                                    <input type="text" name="size" required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label>Date</label>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <input type="date" name="days" placeholder="Days" required>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Comment</label>
                                    <input type="text" name="comment" required>
                                </div>
                            </div>
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

                <div>
                    <center>
                        <button type="submit" name="submit" class="btn btn-primary">Add Package</button>
                    </center>
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