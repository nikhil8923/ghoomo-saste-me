<?php include("./header.php") ?>
<main id="content" class="site-main">
   <!-- Inner Banner html start-->
   <section class="inner-banner-wrap">
      <div class="inner-baner-container" style="background-image: url(assets/images/inner-banner.jpg);">
         <div class="container">
            <div class="inner-banner-content">
               <h1 class="inner-title">Gallery</h1>
            </div>
         </div>
      </div>
      <div class="inner-shape"></div>
   </section>
   <!-- Inner Banner html end-->

   <!-- gallery section html start -->
   <div class="gallery-section">
      <div class="container">
         <div class="gallery-outer-wrap">
            <div class="gallery-inner-wrap gallery-container grid">
               <?php
               // Connect to DB
               include "include/db.php";

               // Fetch all gallery records
               $result = $conn->query("SELECT * FROM gallery ORDER BY id DESC");
               if ($result->num_rows > 0) {
                  while ($row = $result->fetch_assoc()) {
                     $title = htmlspecialchars($row['title']);
                     $image = './admin/uploads/gallery/' . htmlspecialchars($row['image']);
                     echo '<div class="single-gallery grid-item">';
                     echo '   <figure class="gallery-img">';
                     echo '      <img src="' . $image . '" alt="' . $title . '">';
                     echo '      <div class="gallery-title">';
                     echo '         <h3><a href="' . $image . '" data-lightbox="lightbox-set">' . $title . '</a></h3>';
                     echo '      </div>';
                     echo '   </figure>';
                     echo '</div>';
                  }
               } else {
                  echo '<p>No images found in gallery.</p>';
               }

               $conn->close();
               ?>
            </div>
         </div>
      </div>
   </div>
   <!-- gallery section html end -->
</main>
<?php include("./footer.php") ?>