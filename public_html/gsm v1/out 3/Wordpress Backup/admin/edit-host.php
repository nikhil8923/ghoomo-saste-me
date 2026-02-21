<?php include("./header.php");

$conn = new mysqli('localhost', 'root', '', 'ghoomosasteme');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'] ?? 0;

// Fetch host data
$host = $conn->query("SELECT * FROM hosts WHERE id = $id")->fetch_assoc();

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
    $name = $_POST['name'];
    $designation = $_POST['designation'];
    $description = $_POST['description'];
    $facebook_link = $_POST['facebook_link'];
    $instagram_link = $_POST['instagram_link'];
    $image = $host['image']; // default to existing

    // Handle image update
    if (!empty($_FILES['myfile']['name']) && $_FILES['myfile']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "uploads/hostGallery/";
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $image = $uploadDir . basename($_FILES['myfile']['name']);
        move_uploaded_file($_FILES['myfile']['tmp_name'], $image);
    }

    $stmt = $conn->prepare("UPDATE hosts SET name=?, designation=?, description=?, image=?, facebook_link=?, instagram_link=? WHERE id=?");
    $stmt->bind_param("ssssssi", $name, $designation, $description, $image, $facebook_link, $instagram_link, $id);

    if ($stmt->execute()) {
        echo "<p style='color:green;'>✅ Host updated successfully!</p>";
        $host = $conn->query("SELECT * FROM hosts WHERE id = $id")->fetch_assoc(); // Refresh data
    } else {
        echo "<p style='color:red;'>❌ Error updating host.</p>";
    }
}
?>

<!-- Form -->
<div class="db-info-wrap db-add-tour-wrap">
    <form method="POST" enctype="multipart/form-data">
        <div class="form-group">
            <label>Host Name</label>
            <input type="text" name="name" value="<?= htmlspecialchars($host['name']) ?>" required>
        </div>
        <div class="form-group">
            <label>Designation</label>
            <input type="text" name="designation" value="<?= htmlspecialchars($host['designation']) ?>" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea name="description" rows="4" required><?= htmlspecialchars($host['description']) ?></textarea>
        </div>
        <div class="form-group">
            <label>Facebook Link</label>
            <input type="url" name="facebook_link" value="<?= htmlspecialchars($host['facebook_link']) ?>">
        </div>
        <div class="form-group">
            <label>Instagram Link</label>
            <input type="url" name="instagram_link" value="<?= htmlspecialchars($host['instagram_link']) ?>">
        </div>
        <div class="form-group">
            <label>Current Image</label><br>
            <img src="<?= $host['image'] ?>" width="150"><br><br>
            <input type="file" name="myfile">
        </div>
        <button type="submit" name="update" class="btn btn-primary">Update Host</button>
    </form>
</div>