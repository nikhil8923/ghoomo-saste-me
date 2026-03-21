<?php include("./header.php");

include "include/db.php";
$result = $conn->query("SELECT * FROM testimonials ORDER BY id DESC");
?>

<main id="content" class="site-main">
   <!-- Inner Banner html start-->
   <section class="inner-banner-wrap">
      <div class="inner-baner-container" style="background-image: url(assets/images/inner-banner.jpg);">
         <div class="container">
            <div class="inner-banner-content">
               <h1 class="inner-title">Testimonials</h1>
            </div>
         </div>
      </div>
      <div class="inner-shape"></div>
   </section>
   <!-- Inner Banner html end-->

   <div class="testimonial-page-section">
      <div class="container">
         <div class="row">
            <?php while ($row = $result->fetch_assoc()): ?>
               <div class="col-lg-4 col-md-6 mb-4">
                  <div class="testimonial-item text-center">
                     <figure class="testimonial-img">
                        <img src="./admin/<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['name']) ?>" alt="<?= htmlspecialchars($row['name']) ?>" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;">
                     </figure>
                     <div class="testimonial-content">
                        <p><?= nl2br(htmlspecialchars($row['description'])) ?></p>
                        <div class="start-wrap">
                           <div class="rating-start" title="Rated 5 out of 5">
                              <span style="width: 100%"></span> <!-- Static 5-star rating -->
                           </div>
                        </div>
                        <h3><?= htmlspecialchars($row['name']) ?></h3>
                        <span><?= htmlspecialchars($row['designation']) ?></span>
                     </div>
                  </div>
               </div>
            <?php endwhile; ?>
         </div>
      </div>
   </div>
</main>

<?php include("./footer.php") ?>