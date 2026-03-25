import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {

const scrollTop = () => {
window.scrollTo({
top: 0,
behavior: "smooth"
});
};

return ( <footer className="bg-[#111827] text-gray-300 pt-14 font-sans relative">

  <div className="max-w-7xl mx-auto px-4">

    {/* TOP LINKS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm text-center md:text-left">

      {/* COMPANY */}
      <div>
        <h3 className="text-white font-bold mb-4 uppercase">
          Company
        </h3>

        <ul className="space-y-2">

          <li>
            <Link to="/aboutus" onClick={scrollTop} className="hover:text-yellow-400">
              About Us
            </Link>
          </li>

          <li>
            <Link to="/contactus" onClick={scrollTop} className="hover:text-yellow-400">
              Contact Us
            </Link>
          </li>

          <li>
            <Link to="/career" onClick={scrollTop} className="hover:text-yellow-400">
              Career With Us
            </Link>
          </li>

          <li>
            <Link to="/blogs" onClick={scrollTop} className="hover:text-yellow-400">
              Our Blogs
            </Link>
          </li>

        </ul>
      </div>


      {/* QUICK LINKS */}
      <div>
        <h3 className="text-white font-bold mb-4 uppercase">
          Quick Links
        </h3>

        <ul className="space-y-2">

          <li>
            <Link to="/category/backpacking" onClick={scrollTop} className="hover:text-yellow-400">
              Backpacking Trips
            </Link>
          </li>

          <li>
            <Link to="/category/weekend" onClick={scrollTop} className="hover:text-yellow-400">
              Weekend Getaways
            </Link>
          </li>

          <li>
            <Link to="/category/adventure" onClick={scrollTop} className="hover:text-yellow-400">
              Adventure Treks
            </Link>
          </li>

          <li>
            <Link to="/category/corporate" onClick={scrollTop} className="hover:text-yellow-400">
              Corporate Tours
            </Link>
          </li>

        </ul>
      </div>


      {/* POLICIES */}
      <div>
        <h3 className="text-white font-bold mb-4 uppercase">
          Policies
        </h3>

        <ul className="space-y-2">

          <li>
            <Link to="/privacy-policy" onClick={scrollTop} className="hover:text-yellow-400">
              Privacy Policy
            </Link>
          </li>

          <li>
            <Link to="/terms" onClick={scrollTop} className="hover:text-yellow-400">
              Terms & Conditions
            </Link>
          </li>

          <li>
            <Link to="/refund-policy" onClick={scrollTop} className="hover:text-yellow-400">
              Cancellation & Refund Policy
            </Link>
          </li>

          <li>
            <Link to="/sitemap" onClick={scrollTop} className="hover:text-yellow-400">
              Sitemap
            </Link>
          </li>

        </ul>
      </div>

    </div>


    {/* COMPANY INFO */}
    <div className="border-t border-gray-700 mt-10 pt-8 text-center">

      <h2 className="text-white text-xl font-bold tracking-widest mb-2">
        GHOOMO SASTE ME
      </h2>

      <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">
        Travel more, spend less, and create unforgettable memories.
        India's trusted platform for budget friendly adventures.
      </p>


      {/* CONTACT */}
      <div className="flex flex-col gap-2 text-sm font-medium text-white mb-6">

        <a href="mailto:gmsindiaproject@gmail.com" className="hover:text-yellow-400">
          gmsindiaproject@gmail.com
        </a>

        <a href="mailto:support@ghoomosasteme.com" className="hover:text-yellow-400">
          support@ghoomosasteme.com
        </a>

        <a href="tel:+917827372844" className="hover:text-yellow-400">
          Contact: +91 7827372844
        </a>

        <a href="tel:+918265877349" className="hover:text-yellow-400">
          Musafir (24×7 Sales Agent): +91 8265877349
        </a>

      </div>


      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-4 mb-6">

        <a
          href="https://www.facebook.com/profile.php?id=61555190370074"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 transition"
        >
          <Facebook size={18} />
        </a>

        <a
          href="https://www.instagram.com/ghoomo_saste_me/"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 transition"
        >
          <Instagram size={18} />
        </a>

      </div>


      {/* PAYMENT ICONS */}
      <div className="flex justify-center gap-6 mb-6 items-center">

        <img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlepay.svg"
          alt="UPI"
          className="h-6 invert"
        />

        <img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg"
          alt="Visa"
          className="h-6 invert"
        />

        <img
          src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg"
          alt="Mastercard"
          className="h-6"
        />

      </div>

    </div>

  </div>


  {/* COPYRIGHT */}
  <div className="bg-black py-3 text-center text-xs text-gray-500">
    © GHOOMO SASTE ME — All rights reserved
  </div>


  {/* WHATSAPP FLOAT */}
  <a
href="https://wa.me/917827372844"
target="_blank"
rel="noreferrer"
className="hidden md:flex fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition duration-300 items-center justify-center"
>

<MessageCircle size={26} />

</a>
</footer>


);
};

export default Footer;
