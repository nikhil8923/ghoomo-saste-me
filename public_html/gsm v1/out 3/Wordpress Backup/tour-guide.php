<?php include("./header.php") ?>

<?php
include "include/db.php";
$result = $conn->query("SELECT * FROM hosts");
?>

<main id="content" class="site-main">
   <!-- Inner Banner html start-->
   <section class="inner-banner-wrap">
      <div class="inner-baner-container" style="background-image: url(assets/images/inner-banner.jpg);">
         <div class="container">
            <div class="inner-banner-content">
               <h1 class="inner-title">Tour Host</h1>
            </div>
         </div>
      </div>
      <div class="inner-shape"></div>
   </section>
   <!-- Inner Banner html end-->
   <!-- guidel html start -->

   <?php

   $sql = "SELECT * FROM hosts ORDER BY id DESC";
   $result = $conn->query($sql);
   ?>

   <!-- HOST DISPLAY SECTION -->
   <div class="guide-page-section">
      <div class="container">
         <div class="row">

            <?php if ($result->num_rows > 0): ?>
               <?php while ($row = $result->fetch_assoc()): ?>
                  <div class="col-lg-4 col-md-6">
                     <div class="guide-content-wrap text-center">
                        <figure class="guide-image">
                           <img src="./admin/<?= htmlspecialchars($row['image']) ?>" alt="<?= htmlspecialchars($row['name']) ?>" style="width:100%; height:300px; object-fit:cover;">
                        </figure>
                        <div class="guide-content">
                           <h3><?= htmlspecialchars($row['name']) ?></h3>
                           <h5><?= htmlspecialchars($row['designation']) ?></h5>
                           <p><?= nl2br(htmlspecialchars($row['description'])) ?></p>
                           <div class="guide-social social-links">
                              <ul>
                                 <?php if (!empty($row['facebook'])): ?>
                                    <li><a href="<?= htmlspecialchars($row['facebook']) ?>" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                                 <?php endif; ?>
                                 <?php if (!empty($row['instagram'])): ?>
                                    <li><a href="<?= htmlspecialchars($row['instagram']) ?>" target="_blank"><i class="fab fa-instagram"></i></a></li>
                                 <?php endif; ?>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               <?php endwhile; ?>
            <?php else: ?>
               <p>No hosts found.</p>
            <?php endif; ?>

         </div>
      </div>
   </div>



   <!-- callback section html start -->
   <div class="override-callback secondary-overlay" style="background-image: url(assets/images/slider-banner-2.jpg);">
      <div class="container">
         <div class="section-heading section-heading-white">
            <div class="row">
               <div class="col-lg-7">
                  <h5 class="dash-style">INVOLVE NOW</h5>
                  <h2>BE A PART OF OUR TEAM. JOIN US NOW !!</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Eaque adipiscing, luctus eleifend temporibus occaecat luctus eleifend tempo ribus. Earum mollitia vitae eos vulputate? Suspendisse mi beatae odit senectus nostrud lacinia venenatis quia debitis! Viverra quisquam cubilia.</p>
                  <a href="#" class="button-primary">JOINS US NOW</a>
               </div>
            </div>
         </div>
      </div>
   </div>



   <!-- Scripts -->
   <script src="assets/js/jquery-3.2.1.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
   <script src="assets/js/bootstrap.min.js"></script>
   <script src="assets/js/canvasjs.min.js"></script>
   <script src="assets/js/counterup.min.js"></script>
   <script src="assets/js/jquery.slicknav.js"></script>
   <script src="assets/js/dashboard-custom.js"></script>
   <!-- callback html end -->
</main>
<?php include("./footer.php") ?>