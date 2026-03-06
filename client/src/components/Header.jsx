import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, MessageCircle, User, CalendarDays, Mountain, Bus, Backpack, Handshake } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed w-full top-0 z-[9999] font-sans shadow-md">
      
      {/* --- TOP WHITE BAR --- */}
      <div className="bg-white relative z-[10001]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-center py-3 w-full">
            <Link to="/" className="flex items-center shrink-0">
              <img 
                src="/1.png" 
                alt="Ghoomo Saste Me" 
                className="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>

            <div className="hidden lg:flex flex-1 items-center justify-end pr-8 xl:pr-12 gap-6 xl:gap-10">
              <button className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 shadow-md transition-all transform hover:scale-105 whitespace-nowrap">
                <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                Early Bird Offers 2026
              </button>

              <nav className="flex gap-7 xl:gap-8 font-bold text-[15px] text-gray-800 whitespace-nowrap">
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
                <Link to="/about" className="hover:text-blue-600 font-bold">About Us</Link>
                <Link to="/payments" className="hover:text-blue-600 font-bold">Payments</Link>
                <Link to="/contact" className="hover:text-blue-600 font-bold">Contact Us</Link>
              </nav>
            </div>

            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <a href="https://wa.me/917827372844" target="_blank" rel="noreferrer"
                className="hidden sm:flex items-center gap-2 border-2 border-blue-600 text-blue-600 bg-white px-4 py-1.5 rounded-full font-bold text-[15px] hover:bg-blue-50 transition-colors whitespace-nowrap"
              >
                <MessageCircle size={16} /> +91 7827372844
              </a>
              <div className="h-8 w-[1px] bg-gray-300 hidden sm:block"></div>
              <button className="bg-[#1d4ed8] text-white p-2.5 rounded-full hover:bg-blue-800 transition-colors shadow-sm">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BLUE SUB-HEADER --- */}
      <div className="bg-[#1e52bc] relative z-[10000]"> 
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-center items-center py-3.5 text-[14px] md:text-[15px] font-bold text-white gap-8 md:gap-12 lg:gap-16">
            
            {/* 1. UPCOMING GROUP TRIPS */}
            <div className="relative group">
              <button className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors pb-1 outline-none">
                <CalendarDays size={22} className="text-[#ffcc00]" />
                Upcoming Group Trips
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-2xl shadow-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[110] mt-2 border border-gray-100 overflow-hidden">
                <Link to="/upcoming/march" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">March 2026</Link>
                <Link to="/upcoming/april" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">April 2026</Link>
                <Link to="/upcoming/may" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">May 2026</Link>
              </div>
            </div>

            {/* 2. DOMESTIC TRIPS */}
            <div className="relative group">
              <button className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors pb-1 outline-none">
                <Mountain size={22} className="text-[#ffcc00]" />
                Domestic Trips
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white rounded-2xl shadow-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[110] mt-2 border border-gray-100 overflow-hidden">
                <Link to="/state/himachal" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Himachal</Link>
                <Link to="/state/kashmir" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Kashmir</Link>
                <Link to="/state/rajasthan" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Rajasthan</Link>
                <Link to="/state/uttarakhand" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Uttarakhand</Link>
              </div>
            </div>

            {/* 3. WEEKEND TRIPS */}
            <div className="relative group">
              <button className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors pb-1 outline-none">
                <Bus size={22} className="text-[#ffcc00]" />
                Weekend Trips
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[110] mt-2 border border-gray-100 overflow-hidden">
                <Link to="/trip/chopta" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Chopta Tungnath</Link>
                <Link to="/trip/manali-sissu" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Manali Sissu</Link>
                <Link to="/trip/jibhi" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Jibhi & Tirthan Valley</Link>
              </div>
            </div>

            {/* 4. BACKPACKING TRIPS (Meghalaya Removed) */}
            <div className="relative group">
              <button className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors pb-1 outline-none">
                <Backpack size={22} className="text-[#ffcc00]" />
                Backpacking Trips
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white rounded-2xl shadow-2xl py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[110] mt-2 border border-gray-100 overflow-hidden">
                <Link to="/trip/spiti-valley" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Spiti Valley</Link>
                <Link to="/trip/leh-ladakh" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Leh & Ladakh</Link>
                <Link to="/trip/himachal-backpacking" className="block px-6 py-3 text-[14px] font-bold text-[#1a2b4c] hover:bg-gray-50 hover:text-blue-600">Himachal Backpacking</Link>
              </div>
            </div>

            {/* 5. CORPORATE TOURS */}
            <Link to="/corporate" className="flex items-center gap-2.5 whitespace-nowrap hover:text-yellow-300 transition-colors">
              <Handshake size={22} className="text-[#ffcc00]" />
              Corporate Tours
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;