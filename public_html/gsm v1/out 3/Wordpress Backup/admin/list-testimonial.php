<?php
include("../include/db.php");
include("header.php");
?>

<div class="db-info-wrap db-package-wrap">
    <div class="dashboard-box table-opp-color-box">
        <h4>All Hosts</h4>
        <p>Showing all hosts from database with actions.</p>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Host Name</th>
                        <th>Designation</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql = "SELECT * FROM testimonials ORDER BY created_at DESC";
                    $result = mysqli_query($conn, $sql);

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                    ?>
                            <tr>
                                <td><?= htmlspecialchars($row['name']); ?></td>
                                <td><?= htmlspecialchars($row['designation']); ?></td>
                                <td><?= substr(strip_tags($row['description']), 0, 80); ?>...</td>
                                <td>
                                    <?php if (!empty($row['image'])) { ?>
                                        <img src="<?= $row['image']; ?>" width="80" height="60" alt="Host Image">
                                    <?php } else { ?>
                                        No Image
                                    <?php } ?>
                                </td>
                                <td class='d-flex' style='gap:10px'>
                                    <a href="edit-testimonial.php?id=<?= $row['id']; ?>" class="text-light badge badge-success">Edit</a>
                                    <a href="delete-testimonial.php?id=<?= $row['id']; ?>" class="text-light badge badge-danger" onclick="return confirm('Are you sure you want to delete this host?')">Delete</a>
                                </td>
                            </tr>
                    <?php
                        }
                    } else {
                        echo "<tr><td colspan='5' class='text-center'>No hosts found</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>