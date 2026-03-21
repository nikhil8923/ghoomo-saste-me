<?php
include("../include/db.php");
include("header.php");
?>

<div class="db-info-wrap db-package-wrap">
    <div class="dashboard-box table-opp-color-box">
        <h4>Gallery</h4>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql = "SELECT * FROM gallery ORDER BY id DESC";
                    $result = mysqli_query($conn, $sql);

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                    ?>
                            <tr>
                                <td><?= htmlspecialchars($row['title']); ?></td>

                                <td>
                                    <?php if (!empty($row['image'])) { ?>
                                        <img src="./uploads/gallery/<?= htmlspecialchars($row['image']); ?>" width="80" height="60" alt="Image">
                                    <?php } else { ?>
                                        No Image
                                    <?php } ?>
                                </td>

                                <td class='d-flex' style='gap:10px'>
                                    <a href="edit_gallery.php?id=<?= $row['id']; ?>" class="badge badge-success">Edit</a>
                                    <a href="delete_gallery.php?id=<?= $row['id']; ?>" class="badge badge-danger" onclick="return confirm('Are you sure you want to delete?')">Delete</a>

                                </td>
                            </tr>
                    <?php
                        }
                    } else {
                        echo "<tr><td colspan='3' class='text-center'>No gallery entries found</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>