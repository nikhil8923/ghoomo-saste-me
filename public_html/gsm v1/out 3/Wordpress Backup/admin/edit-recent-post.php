<?php
include("../include/db.php");
include("./header.php");

if (!isset($_GET['id'])) {
    echo "Invalid request.";
    exit;
}

$id = intval($_GET['id']);
$sql = "SELECT * FROM blog_posts WHERE id = $id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) !== 1) {
    echo "Post not found.";
    exit;
}

$row = mysqli_fetch_assoc($result);

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $author = mysqli_real_escape_string($conn, $_POST['author']);
    $date = $_POST['date'];
    $comments_count = intval($_POST['comments_count']);

    // Image Handling
    if ($_FILES['image']['name']) {
        $image = time() . '_' . $_FILES['image']['name'];
        move_uploaded_file($_FILES['image']['tmp_name'], "./uploads/" . $image);
        // Delete old image if exists
        if (!empty($row['image'])) {
            unlink("./uploads/" . $row['image']);
        }
        $updateImage = ", image = '$image'";
    } else {
        $updateImage = "";
    }

    $updateSql = "UPDATE blog_posts SET 
        title = '$title',
        author = '$author',
        date = '$date',
        comments_count = $comments_count
        $updateImage
        WHERE id = $id";

    if (mysqli_query($conn, $updateSql)) {
        echo "<script>alert('Post updated successfully'); window.location='recent-post-list.php';</script>";
        exit;
    } else {
        echo "Update failed: " . mysqli_error($conn);
    }
}
?>

<!-- Dashboard Content -->
<div class="db-info-wrap">
    <div class="row">
        <div class="col-lg-12">
            <div class="dashboard-box">
                <h4>Edit Blog Post</h4>
                <p>You can update your blog post content and image here.</p>

                <form class="form-horizontal" method="post" enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Title</label>
                                <input name="title" class="form-control" type="text" value="<?= htmlspecialchars($row['title']); ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Author</label>
                                <input name="author" class="form-control" type="text" value="<?= htmlspecialchars($row['author']); ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Date</label>
                                <input name="date" type="date" class="form-control" value="<?= $row['date']; ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Comments Count</label>
                                <input name="comments_count" type="number" class="form-control" value="<?= $row['comments_count']; ?>" required>
                            </div>
                        </div>

                        <div class="col-sm-6">
                            <div class="form-group">
                                <label>Image</label><br>
                                <?php if ($row['image']) { ?>
                                    <img src="./uploads/<?= $row['image']; ?>" width="100" alt="Current Image"><br><br>
                                <?php } ?>
                                <input type="file" name="image" class="form-control-file">
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