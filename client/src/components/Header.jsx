import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
Zap,
MessageCircle,
User,
CalendarDays,
Mountain,
Bus,
Backpack,
Handshake,
Menu,
X,
ChevronDown
} from "lucide-react";

const Header = () => {
const [mobileMenu, setMobileMenu] = useState(false);
const [domesticOpen, setDomesticOpen] = useState(false);
const triggerRef = useRef(null);
const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });

// Position dropdown under the "Domestic Trips" trigger
useEffect(() => {
if (domesticOpen && triggerRef.current) {
const rect = triggerRef.current.getBoundingClientRect();
setMenuPos({
left: rect.left,
top: rect.bottom + 8
});
}
}, [domesticOpen]);

// Close on outside click
useEffect(() => {
const handleClick = (e) => {
if (!triggerRef.current) return;
if (!triggerRef.current.contains(e.target)) {
setDomesticOpen(false);
}
};
document.addEventListener("click", handleClick);
return () => document.removeEventListener("click", handleClick);
}, []);

return ( <header className="fixed w-full top-0 z-[9999] font-sans bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">


  {/* ================= TOP WHITE BAR ================= */}
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between py-3">

      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center shrink-0"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img
          src="/1.png"
          alt="Ghoomo Saste Me"
          className="h-10 md:h-12 object-contain cursor-pointer"
        />
      </Link>

      {/* CENTER NAV */}
      <div className="hidden lg:flex flex-1 justify-center items-center gap-10">
        <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow hover:scale-105 transition">
          <Zap size={16} className="text-yellow-400 fill-yellow-400"/>
          Early Bird Offers 2026
        </button>

        <nav className="flex gap-8 font-medium text-[15px] text-gray-800">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About Us</Link>
          <Link to="/payments" className="hover:text-blue-600">Payments</Link>
          <Link to="/contact" className="hover:text-blue-600">Contact Us</Link>
        </nav>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 shrink-0">
        <a
          href="https://wa.me/917827372844"
          target="_blank"
          rel="noreferrer"
          className="hidden md:flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-blue-50 transition"
        >
          <MessageCircle size={12}/>
          +91 7827372844
        </a>

        <button className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition">
          <User size={20}/>
        </button>

        {/* MOBILE MENU BUTTON */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={26}/> : <Menu size={26}/>}
        </button>
      </div>
    </div>
  </div>

  {/* ================= MOBILE MENU ================= */}
  {mobileMenu && (
    <div className="lg:hidden bg-white border-t">
      <div className="flex flex-col p-4 gap-4 font-medium">
        <Link to="/" onClick={()=>setMobileMenu(false)}>Home</Link>
        <Link to="/about" onClick={()=>setMobileMenu(false)}>About Us</Link>
        <Link to="/payments" onClick={()=>setMobileMenu(false)}>Payments</Link>
        <Link to="/contact" onClick={()=>setMobileMenu(false)}>Contact</Link>
        <a
          href="https://wa.me/917827372844"
          className="flex items-center gap-2 text-blue-600 font-semibold"
        >
          <MessageCircle size={18}/>
          WhatsApp
        </a>
      </div>
    </div>
  )}

  {/* ================= BLUE CATEGORY BAR ================= */}
  <div className="bg-[#1e52bc]">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex gap-8 overflow-x-auto whitespace-nowrap py-3 px-1 text-white font-medium text-sm no-scrollbar lg:justify-center">

        {/* Upcoming */}
        <HashLink
          smooth
          to="/#upcoming-trips"
          className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
        >
          <CalendarDays size={20} className="text-yellow-400" />
          Upcoming Trips
        </HashLink>

        {/* Domestic Trips (Click Dropdown) */}
        <button
          ref={triggerRef}
          onClick={(e) => {
            e.stopPropagation();
            setDomesticOpen(!domesticOpen);
          }}
          className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
        >
          <Mountain size={20} className="text-yellow-400"/>
          Domestic Trips
          <ChevronDown size={16}/>
        </button>

        {/* Weekend */}
        <Link
          to="/category/weekend"
          className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
        >
          <Bus size={20} className="text-yellow-400"/>
          Weekend Trips
        </Link>

        {/* Backpacking */}
        <Link
          to="/category/backpacking"
          className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
        >
          <Backpack size={20} className="text-yellow-400"/>
          Backpacking Trips
        </Link>

        {/* Corporate */}
        <Link
          to="/category/corporate"
          className="flex items-center gap-2 hover:text-yellow-300 transition-colors"
        >
          <Handshake size={20} className="text-yellow-400"/>
          Corporate Tours
        </Link>
      </div>
    </div>
  </div>

  {/* ===== FIXED DROPDOWN (never hidden behind banner) ===== */}
  {domesticOpen && (
    <div
      style={{ left: menuPos.left, top: menuPos.top }}
      className="fixed bg-white text-black rounded-lg shadow-xl z-[999999] w-52"
    >
      <Link to="/state/himachal" onClick={()=>setDomesticOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
        Himachal Pradesh
      </Link>
      <Link to="/state/uttarakhand" onClick={()=>setDomesticOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
        Uttarakhand
      </Link>
      <Link to="/state/rajasthan" onClick={()=>setDomesticOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
        Rajasthan
      </Link>
      <Link to="/state/kashmir" onClick={()=>setDomesticOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
        Kashmir
      </Link>
    </div>
  )}

</header>


);
};

export default Header;
