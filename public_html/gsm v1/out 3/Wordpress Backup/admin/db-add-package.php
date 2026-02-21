<?php include("./header.php"); ?>

<?php
// DB Connection
include($_SERVER['DOCUMENT_ROOT']."/include/db.php");

// $conn = new mysqli('localhost', 'root', '', 'ghoomosasteme');
// if ($conn->connect_error) {
//     die("Connection failed: " . $conn->connect_error);
// }

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit'])) {
    $title = $_POST['name'] ?? '';
    $description = $_POST['description'] ?? '';
    $group_size = (int)($_POST['size'] ?? 0);
    $days = (int)($_POST['days'] ?? 0);
    $nights = (int)($_POST['nights'] ?? 0);
    $category = $_POST['category'] ?? '';
    $sale_price = (float)($_POST['sale_price'] ?? 0);
    $regular_price = (float)($_POST['regular_price'] ?? 0);
    $discount = (float)($_POST['discount'] ?? 0);
    $map_type = $_POST['location'] ?? '';
    $review_count = (int)($_POST['review_count'] ?? 0);

    // Handle File Upload
    $image = '';
    if (!empty($_FILES['myfile']['name']) && $_FILES['myfile']['error'] === UPLOAD_ERR_OK) {
        $image = basename($_FILES['myfile']['name']);
        $target = "uploads/" . $image;

        // Create uploads folder if not exists
        if (!is_dir("uploads")) {
            mkdir("uploads", 0755, true);
        }

        if (!move_uploaded_file($_FILES['myfile']['tmp_name'], $target)) {
            echo "<p style='color:red;'>❌ Failed to upload image.</p>";
            $image = '';
        }
    }

    // Insert into database
    $stmt = $conn->prepare("INSERT INTO packages (title, description, group_size, duration_days, duration_nights, category, sale_price, regular_price, discount, image, map_type, review_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    if ($stmt === false) {
        echo "<p style='color:red;'>❌ Prepare failed: " . htmlspecialchars($conn->error) . "</p>";
    } else {
        $stmt->bind_param("ssiiissddssi", $title, $description, $group_size, $days, $nights, $category, $sale_price, $regular_price, $discount, $image, $map_type, $review_count);

        if ($stmt->execute()) {
            echo "<p style='color:green;'>✅ Package added successfully!</p>";
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
                        <div class="form-group">
                            <label>Description</label>
                            <textarea name="description" required></textarea>
                        </div>
                    </div>
                </div>

                <div class="dashboard-box">
                    <div class="custom-field-wrap">
                        <h4>Dates and Prices</h4>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Group Size</label>
                                    <input type="number" name="size" required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label>Trip Duration</label>
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <input type="number" name="days" placeholder="Days" required>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <input type="number" name="nights" placeholder="Nights" required>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select name="category" required>
                                        <option value="Adult">Adult</option>
                                        <option value="Child">Child</option>
                                        <option value="Couple">Couple</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Sale Price</label>
                                    <input type="text" name="sale_price" required>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="form-group">
                                    <label>Regular Price</label>
                                    <input type="text" name="regular_price" required>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <div class="form-group">
                                    <label>Discount</label>
                                    <input type="text" name="discount" required>
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

                <div class="dashboard-box">
                    <h4>Location</h4>
                    <div class="custom-field-wrap">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>Select Location</label>
                                    <select name="location" required>
                                        <option value="Jaipur">Jaipur</option>
                                        <option value="Kullu">Kullu</option>
                                        <option value="Manali">Manali</option>
                                        <option value="Shimla">Shimla</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label>Review Count</label>
                    <input type="number" name="review_count" placeholder="Number of Reviews" min="0" required>
                </div>

                <div class="dashboard-box">
                    <button type="submit" name="submit" class="btn btn-primary">Add Package</button>
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