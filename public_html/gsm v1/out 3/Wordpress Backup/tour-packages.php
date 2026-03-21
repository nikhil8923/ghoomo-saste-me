<?php include("./header.php") ?>
<?php
include "include/db.php";

$sql = "SELECT * FROM packages ORDER BY created_at DESC";
$result = $conn->query($sql);
?>

<main id="content" class="site-main">
   <!-- Inner Banner html start-->
   <section class="inner-banner-wrap">
      <div class="inner-baner-container" style="background-image: url(assets/images/inner-banner.jpg);">
         <div class="container">
            <div class="inner-banner-content">
               <h1 class="inner-title">Tour Packages</h1>
            </div>
         </div>
      </div>
      <div class="inner-shape"></div>
   </section>
   <!-- Inner Banner html end-->
   <!-- packages html start -->
   <div class="package-section">
      <div class="container">
         <div class="package-inner">
            <div class="row">

               <!-- Rishikesh -->
               <?php
               if ($result && $result->num_rows > 0):
                  while ($row = $result->fetch_assoc()):
                     // Clean variables
                     $image = !empty($row['image']) ? "admin/uploads/" . htmlspecialchars($row['image']) : "assets/images/default.jpg";
                     $duration = "{$row['duration_days']}D/{$row['duration_nights']}N";
                     $price = number_format($row['sale_price'], 2);
                     $title = htmlspecialchars($row['title']);
                     $description = nl2br(htmlspecialchars($row['description']));
                     $group_size = $row['group_size'];
                     $category = htmlspecialchars($row['category']);
                     $location = htmlspecialchars($row['map_type']);
                     $review_count = htmlspecialchars($row['review_count']);
                     $star_rating = isset($row['star_rating']) ? floatval($row['star_rating']) : 0;
               ?>
                     <div class="col-lg-4 col-md-6">
                        <div class="package-wrap">
                           <figure class="feature-image">
                              <a href="#">
                                 <img src="<?php echo $image; ?>" alt="<?php echo $title; ?>">
                              </a>
                           </figure>
                           <div class="package-price">
                              <h6><span>₹<?php echo $price; ?></span> / per person</h6>
                           </div>
                           <div class="package-content-wrap">
                              <div class="package-meta text-center">
                                 <ul>
                                    <li><i class="far fa-clock"></i> <?php echo $duration; ?></li>
                                    <li><i class="fas fa-user-friends"></i> People: <?php echo $group_size; ?></li>
                                    <li><i class="fas fa-map-marker-alt"></i> <?php echo $location; ?></li>
                                 </ul>
                              </div>
                              <div class="package-content">
                                 <h3><a href="#"><?php echo $title; ?></a></h3>
                                 <div class="review-area">
                                    <span class="review-text">(<?php echo $review_count; ?> reviews)</span>
                                    <div class="" style="color: rgb(241, 198, 4);" title="Rated <?= $star_rating ?> out of 5">
                                       <?php
                                       for ($i = 1; $i <= 5; $i++) {
                                          if ($star_rating >= $i) {
                                             echo '<i class="fas fa-star"></i>'; // full star
                                          } elseif ($star_rating >= $i - 0.5) {
                                             echo '<i class="fas fa-star-half-alt"></i>'; // half star
                                          } else {
                                             echo '<i class="far fa-star"></i>'; // empty star
                                          }
                                       }
                                       ?>
                                    </div>
                                 </div>
                                 <p class="read-more-text"><?php echo substr($description, 0, 300); ?>...</p>
                                 <a href="javascript:void(0);" class="read-more-toggle">Read More</a>

                                 <div class="btn-wrap">
                                    <a href="#" class="button-text width-6">Book Now<i class="fas fa-arrow-right"></i></a>
                                    <a href="#" class="button-text width-6">Wish List<i class="far fa-heart"></i></a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
               <?php
                  endwhile;
               else:
                  echo "<p>No packages found.</p>";
               endif;

               $conn->close();
               ?>



            </div>
         </div>
      </div>
   </div>

   <!-- packages html end -->
   <!-- Home activity section html start -->
   <section class="activity-section">
      <div class="container">
         <div class="section-heading text-center">
            <div class="row">
               <div class="col-lg-8 offset-lg-2">
                  <h5 class="dash-style">TRAVEL BY ACTIVITY</h5>
                  <h2 class="text-secondary headingshadow">ADVENTURE & ACTIVITY</h2>
                  <p>At Ghoomo Saste Me, we believe that the best stories come from stepping out of your comfort zone. Whether you're trekking through hidden Himalayan trails, rafting through wild rapids, or camping under the stars — we bring you adrenaline-packed experiences at budget-friendly prices.</p>
               </div>
            </div>
         </div>
         <div class="activity-inner row">
            <div class="col-lg-2 col-md-4 col-sm-6">
               <div class="activity-item">
                  <div class="activity-icon">
                     <a href="#">
                        <img src="assets/images/icon6.png" alt="">
                     </a>
                  </div>
                  <div class="activity-content">
                     <h4>
                        <a href="#">Adventure</a>
                     </h4>
                     <p>15 Destination</p>
                  </div>
               </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
               <div class="activity-item">
                  <div class="activity-icon">
                     <a href="#">
                        <img src="assets/images/icon10.png" alt="">
                     </a>
                  </div>
                  <div class="activity-content">
                     <h4>
                        <a href="#">Trekking Expeditions</a>
                     </h4>
                     <p>12 Destination</p>
                  </div>
               </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
               <div class="activity-item">
                  <div class="activity-icon">
                     <a href="#">
                        <img src="assets/images/icon9.png" alt="">
                     </a>
                  </div>
                  <div class="activity-content">
                     <h4>
                        <a href="#">Camping & Bonfire Nights</a>
                     </h4>
                     <p>7 Destination</p>
                  </div>
               </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
               <div class="activity-item">
                  <div class="activity-icon">
                     <a href="#">
                        <img src="assets/images/icon8.png" alt="">
                     </a>
                  </div>
                  <div class="activity-content">
                     <h4>
                        <a href="#">Biking Tours & Nature Walks</a>
                     </h4>
                     <p>15 Destination</p>
                  </div>
               </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
               <div class="activity-item">
                  <div class="activity-icon">
                     <a href="#">
                        <img src="assets/images/icon7.png" alt="">
                     </a>
                  </div>
                  <div class="activity-content">
                     <h4>
                        <a href="#"> Paragliding & Ziplining:</a>
                     </h4>
                     <p>13 Destination</p>
                  </div>
               </div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
               <div class="activity-item">
                  <div class="activity-icon">
                     <a href="#">
                        <img src="assets/images/icon11.png" alt="">
                     </a>
                  </div>
                  <div class="activity-content">
                     <h4>
                        <a href="#">Exploring</a>
                     </h4>
                     <p>25 Destination</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>


   <div class="faq-page-section">
      <div class="container">
         <div class="faq-page-container">
            <div class="row">
               <div class="col-lg-6">
                  <div class="faq-content-wrap">
                     <div class="section-heading">
                        <h5 class="dash-style">ANY QUESTIONS</h5>
                        <h2>FREQUENTLY ASKED QUESTIONS</h2>
                        <p>Got questions about planning your perfect trip on a budget? We’re here with the answers! Whether it’s about packages, customizations, or affordability — we've got you covered.</p>
                     </div>
                     <div class="accordion" id="accordionOne">
                        <div class="card">
                           <div class="card-header" id="headingOne">
                              <h4 class="mb-0">
                                 <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    Why are your travel packages so affordable?
                                 </button>
                              </h4>
                           </div>
                           <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionOne">
                              <div class="card-body">
                                 We focus on smart planning, group travel, off-season deals, and zero waste on ads. Our goal is to cut costs without cutting experiences — so you travel more and spend less!
                              </div>
                           </div>
                        </div>
                        <div class="card">
                           <div class="card-header" id="headingTwo">
                              <h4 class="mb-0">
                                 <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Can I customize my tour itinerary?
                                 </button>
                              </h4>
                           </div>
                           <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionOne">
                              <div class="card-body">
                                 Absolutely! We create tailor-made itineraries based on your interests, travel style, and budget. Whether you want adventure, peace, or local flavors — we shape your trip your way.
                              </div>
                           </div>
                        </div>
                        <div class="card">
                           <div class="card-header" id="headingThree">
                              <h4 class="mb-0">
                                 <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    What’s included in your packages?
                                 </button>
                              </h4>
                           </div>
                           <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionOne">
                              <div class="card-body">
                                 Most packages include travel, hotel stay, sightseeing, meals (breakfast/dinner), and fun elements like bonfires or DJs. Each package lists what's included — and you can always request more!
                              </div>
                           </div>
                        </div>
                        <div class="card">
                           <div class="card-header" id="headingFour">
                              <h4 class="mb-0">
                                 <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Do you provide support during the trip?
                                 </button>
                              </h4>
                           </div>
                           <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionOne">
                              <div class="card-body">
                                 Yes, we offer 24/7 travel assistance. Your dedicated trip manager is always a call or message away to help with anything — from changes in plans to travel emergencies.
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <!-- services.php -->
               <div class="col-lg-6">
                  <div class="qsn-form-container">
                     <h3>STILL HAVE A QUESTION?</h3>
                     <p>We’re happy to help! Ask us anything about our tours, prices, or travel support — we’ll get back to you quickly.</p>

                     <form action="./include/service_form_submit.php" method="POST">
                        <p>
                           <input type="text" name="name" placeholder="Your Name*" required>
                        </p>
                        <p>
                           <input type="email" name="email" placeholder="Your Email*" required>
                        </p>
                        <p>
                           <input type="number" name="number" placeholder="Your Number*" required>
                        </p>
                        <p>
                           <textarea name="message" rows="8" placeholder="Enter your message" required></textarea>
                        </p>
                        <p>
                           <input type="submit" name="submit" value="SUBMIT QUESTIONS">
                        </p>
                     </form>
                  </div>
               </div>

            </div>
         </div>
      </div>
   </div>

   <!-- activity html end -->
</main>

<?php include("./footer.php") ?>