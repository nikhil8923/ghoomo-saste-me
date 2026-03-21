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
  const [scrolled, setScrolled] = useState(false);

  const triggerRef = useRef(null);
  const [menuPos, setMenuPos] = useState({ left: 0, top: 0 });

  /* SCROLL EFFECT */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* DROPDOWN POSITION */
  useEffect(() => {
    if (domesticOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setMenuPos({
        left: rect.left,
        top: rect.bottom + 10
      });
    }
  }, [domesticOpen]);

  /* CLOSE DROPDOWN */
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

  return (
    <header
      className={`fixed w-full top-0 z-[9999] font-sans 
      backdrop-blur-xl border-b border-gray-100 transition-all duration-300
      ${scrolled ? "bg-white/90 shadow-md" : "bg-white/80 shadow-sm"}`}
    >
      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-3">

          {/* LOGO */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/1.png"
              alt="Ghoomo Saste Me"
              className="h-14 md:h-16 object-contain cursor-pointer scale-110"
            />
          </Link>

          {/* CENTER NAV */}
          <div className="hidden lg:flex flex-1 justify-center items-center gap-10">

            <button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-lg hover:scale-105 hover:shadow-xl transition">
              <Zap size={16} className="text-yellow-400 fill-yellow-400"/>
              Early Bird Offers 2026
            </button>

            <nav className="flex gap-8 font-medium text-[15px] text-gray-800">
              {["Home","About Us","Payments","Contact Us"].map((item,i)=>(
                <Link
                  key={i}
                  to={item==="Home"?"/":`/${item.toLowerCase().replace(" ","")}`}
                  className="relative group"
                >
                  <span className="group-hover:text-blue-600 transition">
                    {item}
                  </span>
                  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            <a
              href="https://wa.me/917827372844"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-blue-50 transition"
            >
              <MessageCircle size={14}/>
              +91 7827372844
            </a>

            <button className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 transition shadow-md">
              <User size={18}/>
            </button>

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
        <div className="lg:hidden bg-white border-t animate-[fadeIn_0.25s_ease]">
          <div className="flex flex-col p-5 gap-5 font-medium text-gray-700">

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

      {/* ================= CATEGORY BAR ================= */}
      <div className="bg-[#1e52bc]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto whitespace-nowrap py-3 text-white font-medium text-sm lg:justify-center">

            <HashLink smooth to="/#upcoming-trips" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <CalendarDays size={20} className="text-yellow-400" />
              Upcoming Trips
            </HashLink>

            <button
              ref={triggerRef}
              onClick={(e) => {
                e.stopPropagation();
                setDomesticOpen(!domesticOpen);
              }}
              className="flex items-center gap-2 hover:text-yellow-300 transition"
            >
              <Mountain size={20} className="text-yellow-400"/>
              Domestic Trips
              <ChevronDown size={16}/>
            </button>

            <Link to="/category/weekend" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <Bus size={20} className="text-yellow-400"/>
              Weekend Trips
            </Link>

            <Link to="/category/backpacking" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <Backpack size={20} className="text-yellow-400"/>
              Backpacking Trips
            </Link>

            <Link to="/category/corporate" className="flex items-center gap-2 hover:text-yellow-300 transition">
              <Handshake size={20} className="text-yellow-400"/>
              Corporate Tours
            </Link>

          </div>
        </div>
      </div>

      {/* ================= DROPDOWN ================= */}
      {domesticOpen && (
        <div
          style={{ left: menuPos.left, top: menuPos.top }}
          className="fixed bg-white rounded-xl shadow-2xl z-[999999] w-56 border"
        >
          {["Himachal","Uttarakhand","Rajasthan","Kashmir"].map((item,i)=>(
            <Link
              key={i}
              to={`/state/${item.toLowerCase()}`}
              onClick={()=>setDomesticOpen(false)}
              className="block px-4 py-3 hover:bg-gray-50 transition font-medium"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;