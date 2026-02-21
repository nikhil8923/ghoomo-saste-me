<?php
include("../include/db.php");
include("header.php");
?>

<div class="db-info-wrap db-package-wrap">
    <div class="dashboard-box table-opp-color-box">
        <h4>All Blog Posts</h4>
        <p>Showing all blog posts from database with actions.</p>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Comments</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $sql = "SELECT * FROM blog_posts ORDER BY id DESC";
                    $result = mysqli_query($conn, $sql);

                    if (mysqli_num_rows($result) > 0) {
                        while ($row = mysqli_fetch_assoc($result)) {
                    ?>
                            <tr>
                                <td><?= htmlspecialchars($row['title']); ?></td>
                                <td><?= htmlspecialchars($row['author']); ?></td>
                                <td><?= date('F j, Y', strtotime($row['date'])); ?></td>
                                <td><?= $row['comments_count']; ?></td>
                                <td>
                                    <?php if (!empty($row['image'])) { ?>
                                        <img src="./uploads/<?= $row['image']; ?>" width="80" height="60" alt="Image">
                                    <?php } else { ?>
                                        No Image
                                    <?php } ?>
                                </td>
                                <td>
                                    <a href="edit-recent-post.php?id=<?= $row['id']; ?>" class="text-light badge badge-success">Edit</a>
                                    <a href="delete-recent-post.php?id=<?= $row['id']; ?>" class="text-light badge badge-danger" onclick="return confirm('Are you sure you want to delete this post?')">Delete</a>
                                </td>
                            </tr>
                    <?php
                        }
                    } else {
                        echo "<tr><td colspan='6' class='text-center'>No blog posts found</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>