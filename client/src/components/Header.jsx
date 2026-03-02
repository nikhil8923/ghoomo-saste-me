import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, MessageCircle, User, CalendarDays, Mountain, Bus, Backpack, Handshake } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-50 font-sans shadow-md">
      
      {/* --- TOP WHITE BAR --- */}
     <div className="bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-3 w-full">
            
            {/* 1. LOGO */}
            <Link to="/" className="flex items-center shrink-0">
              <img 
                src="/1.png" 
                alt="Ghoomo Saste Me" 
                className="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>

            {/* 2. CENTER NAVIGATION (Shifted Right with More Spacing) */}
            {/* Added flex-1 and justify-end to push everything right, and increased gap to 8/10 */}
            <div className="hidden lg:flex flex-1 items-center justify-end pr-8 xl:pr-12 gap-6 xl:gap-10">
              
              {/* Red Early Bird Button */}
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-md transition-all transform hover:scale-105 whitespace-nowrap">
                <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                Early Bird Offers 2026
              </button>

              {/* Text Links (Increased gap to 8 for more space) */}
              <nav className="flex gap-7 xl:gap-8 font-bold text-[15px] text-gray-800 whitespace-nowrap">
                <a href="#about" className="hover:text-blue-600 transition-colors">About Us</a>
                <a href="#blogs" className="hover:text-blue-600 transition-colors">Blogs</a>
                <a href="#careers" className="hover:text-blue-600 transition-colors">Careers</a>
                <a href="#payments" className="hover:text-blue-600 transition-colors">Payments</a>
                <a href="#contact" className="hover:text-blue-600 transition-colors">Contact Us</a>
              </nav>
            </div>

            {/* 3. RIGHT ACTIONS */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              
              {/* Outlined WhatsApp Button */}
              <a 
                href="https://wa.me/919090403075" 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:flex items-center gap-2 border-2 border-blue-600 text-blue-600 bg-white px-4 py-1.5 rounded-full font-bold text-[15px] hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                <MessageCircle size={18} />
                +91 9090403075
              </a>

              {/* Divider Line */}
              <div className="h-8 w-[1px] bg-gray-300 hidden sm:block"></div>

              {/* User Profile Icon */}
              <button className="bg-[#1d4ed8] text-white p-2.5 rounded-full hover:bg-blue-800 transition-colors shadow-sm">
                <User size={20} />
              </button>

            </div>
            
          </div>
        </div>
      </div>

      {/* --- BOTTOM BLUE SUB-HEADER --- */}
     {/* --- BOTTOM BLUE SUB-HEADER --- */}
      <div className="bg-[#1e52bc]"> 
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Centered with wide gaps, matching your reference screenshot exactly */}
          <div className="flex justify-center items-center py-3.5 overflow-x-auto hide-scrollbar text-[14px] md:text-[15px] font-bold text-white gap-8 md:gap-12 lg:gap-16">
            
            <a href="#upcoming" className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors">
              <CalendarDays size={22} className="text-[#ffcc00]" />
              Upcoming Group Trips
            </a>

            <a href="#domestic" className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors">
              <Mountain size={22} className="text-[#ffcc00]" />
              Domestic Trips
            </a>

            <a href="#weekend" className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors">
              <Bus size={22} className="text-[#ffcc00]" />
              Weekend Trips
            </a>

            <a href="#backpacking" className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors">
              <Backpack size={22} className="text-[#ffcc00]" />
              Backpacking Trips
            </a>

            <a href="#corporate" className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors">
              <Handshake size={22} className="text-[#ffcc00]" />
              Corporate Tours
            </a>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;