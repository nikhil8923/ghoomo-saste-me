import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
Menu,
MessageCircle,
Send,
Phone,
Mountain,
Bus,
Backpack
} from "lucide-react";

const MobileBottomNav = () => {

const [menuOpen,setMenuOpen] = useState(false);

return (

<>

{/* ================= PREMIUM SIDE MENU ================= */}

<div className={`fixed top-0 left-0 h-full w-[80%] max-w-[320px] bg-white/95 backdrop-blur-xl z-[99999] shadow-2xl transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0":"-translate-x-full"}`}>

{/* MAIN LAYOUT */}

<div className="h-full flex flex-col">

{/* ================= SCROLLABLE CONTENT ================= */}

<div className="flex-1 overflow-y-auto p-6 pb-28">

<h2 className="text-xl font-extrabold mb-6">
Explore Trips ✈️
</h2>

<nav className="flex flex-col gap-3">

{/* HIMACHAL */}

<Link
to="/state/himachal"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition shadow-sm active:scale-95"
>
<Mountain className="text-blue-600"/>
Himachal Pradesh
</Link>

{/* UTTARAKHAND */}

<Link
to="/state/uttarakhand"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-green-50 transition shadow-sm active:scale-95"
>
<Mountain className="text-green-600"/>
Uttarakhand
</Link>

{/* RAJASTHAN */}

<Link
to="/state/rajasthan"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-orange-50 transition shadow-sm active:scale-95"
>
<Mountain className="text-orange-500"/>
Rajasthan
</Link>

{/* KASHMIR */}

<Link
to="/state/kashmir"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-cyan-50 transition shadow-sm active:scale-95"
>
<Mountain className="text-cyan-600"/>
Kashmir
</Link>

{/* WEEKEND */}

<Link
to="/category/weekend"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-yellow-50 transition shadow-sm active:scale-95"
>
<Bus className="text-yellow-500"/>
Weekend Trips
</Link>

{/* BACKPACKING */}

<Link
to="/category/backpacking"
onClick={()=>setMenuOpen(false)}
className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition shadow-sm active:scale-95"
>
<Backpack className="text-purple-600"/>
Backpacking Trips
</Link>

</nav>

</div>

{/* ================= FIXED CTA ================= */}

<div className="p-4 border-t bg-white">

<a
href="https://wa.me/917827372844"
className="block text-center bg-green-500 text-white py-3 rounded-xl font-bold shadow-lg mb-2 active:scale-95 transition"

>

Chat on WhatsApp </a>

<button
onClick={()=>setMenuOpen(false)}
className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition"

>

Book Now </button>

</div>

</div>

</div>

{/* ================= OVERLAY ================= */}

{menuOpen && (

<div
onClick={()=>setMenuOpen(false)}
className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99998] md:hidden"
></div>

)}

{/* ================= MOBILE BOTTOM NAV ================= */}

<div className="fixed bottom-0 w-full bg-white border-t flex justify-around py-2 z-[9999] md:hidden">

{/* MENU */}
<button
onClick={()=>setMenuOpen(true)}
className="flex flex-col items-center text-gray-700"

>

<Menu size={22}/>
<span className="text-xs">Menu</span>
</button>

{/* WHATSAPP */}
<a
href="https://wa.me/917827372844"
className="flex flex-col items-center text-green-600"

>

<MessageCircle size={22}/>
<span className="text-xs">WhatsApp</span>
</a>

{/* QUERY */}

<Link
to="/contact"
className="flex flex-col items-center text-blue-600"
>
<Send size={22}/>
<span className="text-xs">Query</span>
</Link>

{/* CALL */}
<a
href="tel:+917827372844"
className="flex flex-col items-center text-red-500"

>

<Phone size={22}/>
<span className="text-xs">Call</span>
</a>

</div>

</>

);

};

export default MobileBottomNav;
