<?php include("./header.php") ?>
<main id="content" class="site-main">
   <!-- Inner Banner html start-->
   <section class="inner-banner-wrap">
      <div class="inner-baner-container" style="background-image: url(assets/images/inner-banner.jpg);">
         <div class="container">
            <div class="inner-banner-content">
               <h1 class="inner-title">Contact us</h1>
            </div>
         </div>
      </div>
      <div class="inner-shape"></div>
   </section>
   <!-- Inner Banner html end-->
   <!-- contact form html start -->
   <div class="contact-page-section">
      <div class="contact-form-inner">
         <div class="container">
            <div class="row">
               <div class="col-md-6">
                  <div class="contact-from-wrap">
                     <div class="section-heading">
                        <h5 class="dash-style">GET IN TOUCH</h5>
                        <h2>CONTACT US TO GET MORE INFO</h2>
                        <p>We're here to help you plan your perfect trip! Whether you have questions about our packages, need help with booking, or want a customized travel experience — our team is ready to assist you.</p>
                     </div>
                     <form class="contact-from" action="include/contact_form_submit.php" method="POST">
                        <p>
                           <input type="text" name="name" placeholder="Your Name*" required>
                        </p>
                        <p>
                           <input type="email" name="email" placeholder="Your Email*" required>
                        </p>
                        <p>
                           <input type="text" name="mobile" placeholder="Your Mobile*" pattern="[6-9]{1}[0-9]{9}" maxlength="10" required title="Enter 10-digit mobile number starting with 6-9">
                        </p>
                        <p>
                           <textarea name="message" rows="8" placeholder="Your Message*" required></textarea>
                        </p>
                        <p>
                           <input type="submit" name="submit" value="SUBMIT MESSAGE">
                        </p>
                     </form>

                  </div>
               </div>
               <div class="col-md-6">
                  <div class="contact-detail-wrap">
                     <h3>Need help ?? Feel free to contact us !</h3>
                     <p>We're here to assist you with any questions or concerns. Whether you need help choosing the right course, booking a service, or understanding our offerings — don't hesitate to reach out.</p>
                     <div class="details-list">
                        <ul>
                           <li>
                              <span class="icon">
                                 <i class="fas fa-map-signs"></i>
                              </span>
                              <div class="details-content">
                                 <h4>Location Address</h4>
                                 <span> A 27 , Shivaji Vihar Near SBI Bank Raghuveer Nagar Rajouri Garden 110027</span>
                              </div>
                           </li>
                           <li>
                              <span class="icon">
                                 <i class="fas fa-envelope-open-text"></i>
                              </span>
                              <div class="details-content">
                                 <h4>Email Address</h4>
                                 <span><a href="mailto:gsmindiaproject@gmail.com" class="__cf_email__" data-cfemail="3753585a565e597754585a4756594e1954585a">gsmindiaproject@gmail.com</a></span>
                              </div>
                           </li>
                           <li>
                              <span class="icon">
                                 <i class="fas fa-phone-volume"></i>
                              </span>
                              <div class="details-content">
                                 <h4>Phone Number</h4>
                                 <span><a href="tel: +91-7827372844"> +91-7827372844</a></span>
                              </div>
                           </li>

                           <li>
                              <span class="icon">
                                 <i class="fas fa-clock"></i>
                              </span>
                              <div class="details-content">
                                 <h4>🕒 Available: Monday – Saturday, 10:00 AM – 6:00 PM</h4>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div class="contct-social social-links">
                        <h3>Follow us on social media..</h3>
                        <ul>
                           <li><a href="https://www.facebook.com/share/1aAatsPzPM/"><i class="fab fa-facebook-f" aria-hidden="true"></i></a></li>
                           <li><a href="https://www.instagram.com/ghoomo_saste_me?igsh=YzljYTk1ODg3Zg=="><i class="fab fa-instagram" aria-hidden="true"></i></a></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>


      <div class="map-section">
         <iframe src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=3rd%20Floor,%20Park,%20Ghoomo%20Saste%20Me,%20back%20side,%20A27,%20Block%20B,%20Raghubir%20Nagar,%20Tagore%20Garden%20Extension,%20Delhi,%20110074+(ghoomo%20saste%20me)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" height="400" allowfullscreen="" loading="lazy"></iframe>
      </div>
   </div>
   <!-- contact form html end -->
</main>
<?php include("./footer.php") ?>