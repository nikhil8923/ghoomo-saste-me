import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, MessageCircle, Send, Phone } from "lucide-react";

const MobileBottomNav = () => {

const [menuOpen,setMenuOpen] = useState(false);

return (

<>

{/* LEFT SLIDE MENU (Mobile Only) */}

<div className={`fixed top-0 left-0 h-full w-[75%] bg-white z-[99999] shadow-xl transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0":"-translate-x-full"}`}>

<div className="p-6">

<h2 className="text-xl font-bold mb-6">
Trips
</h2>

<nav className="flex flex-col gap-5 text-lg">

<Link to="/state/himachal" onClick={()=>setMenuOpen(false)}>
Himachal Pradesh
</Link>

<Link to="/state/uttarakhand" onClick={()=>setMenuOpen(false)}>
Uttarakhand
</Link>

<Link to="/state/rajasthan" onClick={()=>setMenuOpen(false)}>
Rajasthan
</Link>

<Link to="/state/kashmir" onClick={()=>setMenuOpen(false)}>
Kashmir
</Link>

<Link to="/category/weekend" onClick={()=>setMenuOpen(false)}>
Weekend Trips
</Link>

<Link to="/category/backpacking" onClick={()=>setMenuOpen(false)}>
Backpacking Trips
</Link>

</nav>

</div>

</div>

{/* OVERLAY */}

{menuOpen && (

<div
onClick={()=>setMenuOpen(false)}
className="fixed inset-0 bg-black/40 z-[99998] md:hidden"
></div>
)}

{/* MOBILE BOTTOM NAV */}

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
