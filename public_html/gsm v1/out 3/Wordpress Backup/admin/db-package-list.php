<?php
include($_SERVER['DOCUMENT_ROOT']."/include/db.php");
include("header.php");
?>

<div class="db-info-wrap db-package-wrap">
    <div class="dashboard-box table-opp-color-box">
        <h4>All Packages</h4>
        <p>Showing all packages from database with actions.</p>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Group Size</th>
                        <th>Days</th>
                        <th>Nights</th>
                        <th>Category</th>
                        <th>Sale Price</th>
                        <th>Regular Price</th>
                        <th>Discount</th>
                        <th>Image</th>
                        <th>Map Type</th>
                        <th>Reviews</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql = "SELECT * FROM packages";
                    $result = mysqli_query($conn, $sql);

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                    ?>
                            <tr>
                                <td><?= $row['title']; ?></td>
                                <td><?= substr($row['description'], 0, 50); ?>...</td>
                                <td><?= $row['group_size']; ?></td>
                                <td><?= $row['duration_days']; ?></td>
                                <td><?= $row['duration_nights']; ?></td>
                                <td><?= $row['category']; ?></td>
                                <td><?= $row['sale_price']; ?></td>
                                <td><?= $row['regular_price']; ?></td>
                                <td><?= $row['discount']; ?>%</td>
                                <td>
                                    <?php if (!empty($row['image'])) { ?>
                                        <img src="uploads/<?= $row['image']; ?>" width="80" height="60" alt="Image">
                                    <?php } else { ?>
                                        No Image
                                    <?php } ?>
                                </td>
                                <td><?= $row['map_type']; ?></td>
                                <td><?= $row['review_count']; ?></td>
                                <td class='d-flex' style='gap:10px'>
                                    <a href="edit_package.php?id=<?= $row['id']; ?>" class="text-light badge badge-success">Edit</a>
                                    <a href="delete_package.php?id=<?= $row['id']; ?>" class="text-light badge badge-danger" onclick="return confirm('Are you sure you want to delete?')">Delete</a>
                                </td>
                            </tr>
                    <?php
                        }
                    } else {
                        echo "<tr><td colspan='13' class='text-center'>No packages found</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>