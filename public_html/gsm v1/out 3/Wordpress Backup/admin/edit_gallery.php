<?php
include("./header.php");
include("../include/db.php");


$id = $_GET['id'];
$sql = "SELECT * FROM gallery WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$gallery = $result->fetch_assoc();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $image = $gallery['image'];

    // Handle new image upload
    if (!empty($_FILES['image']['name']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $newImage = basename($_FILES['image']['name']);
        $target = "./uploads/gallery" . $newImage;

        if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
            $image = $newImage; // overwrite image name
        }
    }

    $update = $conn->prepare("UPDATE gallery SET title=?, image=? WHERE id=?");
    $update->bind_param("ssi", $title, $image, $id);

    if ($update->execute()) {
        echo "<p style='color:green;'>✅ Gallery updated successfully!</p>";
    } else {
        echo "<p style='color:red;'>❌ Update failed.</p>";
    }
}
?>

<!-- Dashboard Content -->
<div class="db-info-wrap">
    <div class="row">
        <div class="col-lg-12">
            <div class="dashboard-box">
                <h4>Edit Gallery</h4>

                <form class="form-horizontal" method="post" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Title</label>
                                <input name="title" class="form-control" type="text" value="<?= htmlspecialchars($gallery['title']) ?>" required>
                            </div>
                        </div>


                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Image</label><br>

                                <?php if ($gallery['image']) { ?>
                                    <img src="./uploads/gallery/<?= htmlspecialchars($gallery['image']) ?>" width="100"><br>
                                <?php } ?>
                                <input type="file" name="image" class="form-control-file"><br><br>

                            </div>
                        </div>
                    </div>
                    <br>
                    <input type="submit" class="btn btn-primary" value="Update Post">
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Copyrights -->
<div class="copyrights">
    Copyright © 2025 Codewebzz. All rights reserved.
</div>
</div>
<!-- End Dashboard Content -->

<!-- Scripts -->
<script src="assets/js/jquery-3.2.1.min.js"></script>
<script src="assets/js/bootstrap.min.js"></script>
<script src="assets/js/dashboard-custom.js"></script>
</body>

</html>