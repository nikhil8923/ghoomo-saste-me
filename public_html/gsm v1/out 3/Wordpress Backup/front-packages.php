<?php include("./header.php"); ?>

<?php
// Database connection
include "./include/db.php";
// Fetch latest 4 packages
$sql = "SELECT * FROM packages ORDER BY created_at DESC LIMIT 4";
$result = $conn->query($sql);
?>

<section class="package-section bg-light-grey">
    <div class="container">
        <div class="section-heading text-center">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                    <h5>EXPLORE GREAT PLACES</h5>
                    <h2 class="headingshadow">
                        <img src="./assets/images/owl.png" width="50px" alt="owl" />
                        POPULAR PACKAGES
                        <img src="./assets/images/owl.png" width="50px" alt="owl" />
                    </h2>
                    <div class="title-icon-divider"><i class="fas fa-suitcase-rolling"></i></div>
                </div>
            </div>
        </div>

        <div class="package-inner package-inner-list">
            <div class="row">
                <?php if ($result && $result->num_rows > 0): ?>
                    <?php while ($row = $result->fetch_assoc()): ?>
                        <div class="col-lg-6">
                            <div class="package-wrap package-wrap-list">
                                <figure class="feature-image">
                                    <a href="#">
                                        <img src="<?php echo !empty($row['image']) ? 'admin/uploads/' . htmlspecialchars($row['image']) : 'admin/uploads/default.jpg'; ?>"
                                            alt="<?= htmlspecialchars($row['title']) ?>">
                                    </a>
                                    <div class="package-price">
                                        <h6>
                                            <span>₹<?= htmlspecialchars($row['sale_price']) ?></span>
                                            <?php if (!empty($row['regular_price']) && $row['regular_price'] > $row['sale_price']): ?>
                                                <small style="text-decoration: line-through; color: #999;">
                                                    ₹<?= htmlspecialchars($row['regular_price']) ?>
                                                </small>
                                            <?php endif; ?>
                                            / per person
                                        </h6>
                                    </div>
                                    <div class="package-meta text-center">
                                        <ul>
                                            <li><i class="far fa-clock"></i> <?= htmlspecialchars($row['duration_days']) ?>D / <?= htmlspecialchars($row['duration_nights']) ?>N</li>
                                            <li><i class="fas fa-user-friends"></i> <?= htmlspecialchars($row['category']) ?></li>
                                            <li><i class="fas fa-map-marker-alt"></i> <?= htmlspecialchars($row['map_type']) ?></li>
                                        </ul>
                                    </div>
                                </figure>
                                <div class="package-content">
                                    <h3><a href="#"><?= htmlspecialchars($row['title']) ?></a></h3>
                                    <div class="review-area">
                                        <span class="review-text">(<?= htmlspecialchars($row['review_count']) ?> reviews)</span>
                                        <div class="rating-start" title="Rated <?= htmlspecialchars($row['star_rating']) ?> out of 5">
                                            <span style="width: <?= (float)$row['star_rating'] * 20 ?>%"></span>
                                        </div>
                                    </div>
                                    <p class="read-more-text"><?= htmlspecialchars($row['description']) ?></p>
                                    <a href="javascript:void(0);" class="read-more-toggle">Read More</a>
                                    <div class="btn-wrap">
                                        <a href="#" class="button-text width-6">Book Now <i class="fas fa-arrow-right"></i></a>
                                        <a href="#" class="button-text width-6">Wish List <i class="far fa-heart"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; ?>
                <?php else: ?>
                    <div class="col-12 text-center">
                        <p>No packages found.</p>
                    </div>
                <?php endif; ?>
            </div>

            <div class="btn-wrap text-center mt-4">
                <a href="./tour-packages.php" class="button-primary">VIEW ALL PACKAGES</a>
            </div>
        </div>
    </div>
</section>