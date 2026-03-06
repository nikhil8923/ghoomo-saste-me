import React from 'react';
import { Link } from 'react-router-dom'; // Added for proper navigation
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle, CreditCard } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 pt-16 relative font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Top Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12 text-sm text-center md:text-left">
          
          {/* Company Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-yellow-400 transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link></li>
              <li><a href="#career" className="hover:text-yellow-400 transition">Career With Us</a></li>
              <li><a href="#blogs" className="hover:text-yellow-400 transition">Our Blogs</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#backpacking" className="hover:text-yellow-400 transition">Backpacking Trips</a></li>
              <li><a href="#weekend" className="hover:text-yellow-400 transition">Weekend Getaways</a></li>
              <li><a href="#adventure" className="hover:text-yellow-400 transition">Adventure Treks</a></li>
              <li><a href="#corporate" className="hover:text-yellow-400 transition">Corporate Tours</a></li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider">Policies</h3>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-yellow-400 transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-yellow-400 transition">Terms & Conditions</a></li>
              
              {/* --- ADDED PAYMENTS LINK HERE --- */}
              <li>
                <Link 
                  to="/payments" 
                  onClick={() => window.scrollTo(0, 0)} 
                  className="hover:text-yellow-400 transition flex items-center justify-center md:justify-start gap-2"
                >
                  <CreditCard size={14} /> Cancellation & Refund Policy
                </Link>
              </li>
              
              <li><a href="#sitemap" className="hover:text-yellow-400 transition">Sitemap</a></li>
            </ul>
          </div>

        </div>

        {/* Middle Section: Company Info & Socials */}
        <div className="border-t border-gray-700 pt-10 pb-8 text-center flex flex-col items-center">
          
          <h2 className="text-white text-2xl font-black tracking-widest mb-3 uppercase">GHOOMO SASTE ME</h2>
          <p className="text-sm text-gray-400 max-w-2xl mb-6">
            Travel more, spend less, and create real memories. India's trusted platform for budget-friendly adventures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm font-semibold text-white mb-8">
            <a href="mailto:hello@ghoomosasteme.com" className="hover:text-yellow-400 transition">hello@ghoomosasteme.com</a>
            <span className="hidden sm:inline">|</span>
            <a href="tel:+918923172497" className="hover:text-yellow-400 transition">+91-9090403075</a>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.ghoomosasteme.com" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition">www.ghoomosasteme.com</a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mb-8">
            <a href="#facebook" className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-600 transition text-white">
              <Facebook size={20} />
            </a>
            <a href="#instagram" className="bg-gray-800 p-2.5 rounded-full hover:bg-pink-600 transition text-white">
              <Instagram size={20} />
            </a>
            <a href="#linkedin" className="bg-gray-800 p-2.5 rounded-full hover:bg-blue-700 transition text-white">
              <Linkedin size={20} />
            </a>
            <a href="#youtube" className="bg-gray-800 p-2.5 rounded-full hover:bg-red-600 transition text-white">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Skyline Graphic */}
      <div className="w-full h-24 bg-[url('https://cdn.pixabay.com/photo/2018/03/15/16/11/background-3228704_1280.png')] bg-repeat-x bg-bottom bg-contain opacity-40 mix-blend-screen pointer-events-none"></div>

      {/* Copyright Bar */}
      <div className="bg-black py-4 text-center text-xs text-gray-500 relative z-10">
        <p>© GHOOMO SASTE ME, All rights reserved.</p>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/918923172497" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center"
      >
        <MessageCircle size={28} fill="currentColor" />
      </a>
    </footer>
  );
};

export default Footer;