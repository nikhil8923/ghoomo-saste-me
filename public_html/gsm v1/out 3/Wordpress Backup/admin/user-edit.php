<?php include("./header.php") ?>
<?php
// Connect to DB
include("../include/db.php");

// Get ID from URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    die("Invalid ID");
}

// Fetch existing data to pre-fill form
$sql = "SELECT * FROM packages WHERE id = $id";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) == 0) {
    die("Record not found.");
}
$row = mysqli_fetch_assoc($result);

// Initialize variables with existing data
$title = $row['title'];
$description = $row['description'];
$group_size = $row['group_size'];
$duration_days = $row['duration_days'];
$duration_nights = $row['duration_nights'];
$category = $row['category'];
$sale_price = $row['sale_price'];
$regular_price = $row['regular_price'];
$discount = $row['discount'];
$image = $row['image'];
$map_type = $row['map_type'];
$review_count = $row['review_count'];

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $group_size = intval($_POST['group_size']);
    $duration_days = intval($_POST['duration_days']);
    $duration_nights = intval($_POST['duration_nights']);
    $category = mysqli_real_escape_string($conn, $_POST['category']);
    $sale_price = floatval($_POST['sale_price']);
    $regular_price = floatval($_POST['regular_price']);
    $discount = floatval($_POST['discount']);
    $map_type = mysqli_real_escape_string($conn, $_POST['map_type']);
    $review_count = intval($_POST['review_count']);

    // Image upload handling
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $target_dir = "uploads/";
        $image = basename($_FILES["image"]["name"]);
        $target_file = $target_dir . $image;

        // Optional: Validate file type, size etc.
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
        $allowed_types = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($imageFileType, $allowed_types)) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            exit;
        }

        if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            echo "Sorry, there was an error uploading your file.";
            exit;
        }
    }

    // Prepare update query
    $sql_update = "UPDATE packages SET 
        title = '$title',
        description = '$description',
        group_size = $group_size,
        duration_days = $duration_days,
        duration_nights = $duration_nights,
        category = '$category',
        sale_price = $sale_price,
        regular_price = $regular_price,
        discount = $discount,
        map_type = '$map_type',
        review_count = $review_count";

    // Add image update if new image uploaded
    if (isset($image)) {
        $sql_update .= ", image = '$image'";
    }

    $sql_update .= " WHERE id = $id";

    if (mysqli_query($conn, $sql_update)) {
        echo "<p style='color:green;'>Record updated successfully.</p>";
        // Refresh data after update
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
    } else {
        echo "Error updating record: " . mysqli_error($conn);
    }
}
?>
<div class="db-info-wrap">
    <div class="row">
        <div class="col-lg-12">
            <div class="dashboard-box user-form-wrap">
                <h4>Edit package</h4>
                <form class="form-horizontal" method="post">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Title</label>
                                <input name="title" class="form-control" type="text" value="<?php echo htmlspecialchars($title); ?>" required>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Description</label>
                                <textarea class="form-control" name="description" rows="4" required><?php echo htmlspecialchars($description); ?></textarea>

                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Group Size</label>
                                <input name="group_size" class="form-control" type="number" value="<?php echo $group_size; ?>" required>

                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Duration (Days)</label>
                                <input name="duration_days" class="form-control" type="number" value="<?php echo $duration_days; ?>" required>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Duration (Nights)</label>
                                <input name="duration_nights" class="form-control" type="number" value="<?php echo $duration_nights; ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Category</label>
                                <input name="category" type="text" class="form-control" value="<?php echo htmlspecialchars($category); ?>" required>
                            </div>
                        </div>


                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Sale Price</label>
                                <input name="sale_price" class="form-control" type="number" step="0.01" value="<?php echo $sale_price; ?>" required>
                            </div>
                        </div>


                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Sale Price</label>
                                <input name="sale_price" class="form-control" type="number" step="0.01" value="<?php echo $sale_price; ?>" required>
                            </div>
                        </div>


                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Discount (%)</label>
                                <input name="discount" class="form-control" type="number" step="0.01" value="<?php echo $discount; ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Map Type</label>
                                <input name="map_type" class="form-control" type="text" value="<?php echo htmlspecialchars($map_type); ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Review Count</label>
                                <input name="review_count" class="form-control" type="number" value="<?php echo $review_count; ?>" required>
                            </div>
                        </div>


                        <!-- <div class="col-sm-6">
                            <div class="form-group">
                                <label>Country Code</label>
                                <select>
                                    <option value="1">+97701</option>
                                    <option value="0">1990</option>
                                    <option value="0">1992</option>
                                    <option value="0">1993</option>
                                </select>
                            </div>
                        </div> -->




                        <div class="col-sm-6">
                            <div class="upload-input">
                                <div class="form-group">
                                    <span class="upload-btn">Upload a image</span>
                                    <input name="image" type="file" accept="image/*">
                                    <?php if (!empty($image)) {
                                        echo "<img src='uploads/" . htmlspecialchars($image) . "' alt='Current Image'>";
                                    } ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="button-primary">Update Packge</button>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Content / End -->
<!-- Copyrights -->
<div class="copyrights">
    Copyright © 2025 Codewebzz. All rights reserveds.
</div>
<?php
mysqli_close($conn);
?>
</div>
<!-- Dashboard / End -->
</div>
<!-- end Container Wrapper -->
<!-- *Scripts* -->
<script src="assets/js/jquery-3.2.1.min.js"></script>
<script src="../../../../cdn.jsdelivr.net/npm/popper.js%401.16.0/dist/umd/popper.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/canvasjs.min.js"></script>
<script src="assets/js/counterup.min.js"></script>
<script src="assets/js/jquery.slicknav.js"></script>
<script src="assets/js/dashboard-custom.js"></script>
<script>
    (function() {
        function c() {
            var b = a.contentDocument || a.contentWindow.document;
            if (b) {
                var d = b.createElement('script');
                d.innerHTML = "window.__CF$cv$params={r:'8ca8d7512abe11ac',t:'MTcyNzU4MDA2NS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='../../../cdn-cgi/challenge-platform/h/g/scripts/jsd/ec4b873d446c/maind41d.js';document.getElementsByTagName('head')[0].appendChild(a);";
                b.getElementsByTagName('head')[0].appendChild(d)
            }
        }
        if (document.body) {
            var a = document.createElement('iframe');
            a.height = 1;
            a.width = 1;
            a.style.position = 'absolute';
            a.style.top = 0;
            a.style.left = 0;
            a.style.border = 'none';
            a.style.visibility = 'hidden';
            document.body.appendChild(a);
            if ('loading' !== document.readyState) c();
            else if (window.addEventListener) document.addEventListener('DOMContentLoaded', c);
            else {
                var e = document.onreadystatechange || function() {};
                document.onreadystatechange = function(b) {
                    e(b);
                    'loading' !== document.readyState && (document.onreadystatechange = e, c())
                }
            }
        }
    })();
</script>
<script defer
    src="https://static.cloudflareinsights.com/beacon.min.js/vcd15cbe7772f49c399c6a5babf22c1241717689176015"
    integrity="sha512-ZpsOmlRQV6y907TI0dKBHq9Md29nnaEIPlkf84rnaERnq6zvWvPUqr2ft8M1aS28oN72PdrCzSjY4U6VaAw1EQ=="
    data-cf-beacon='{"rayId":"8ca8d7512abe11ac","version":"2024.8.0","r":1,"serverTiming":{"name":{"cfExtPri":true,"cfL4":true}},"token":"2aaac9563824454ba89abdea91540009","b":1}'
    crossorigin="anonymous"></script>
</body>


</html>