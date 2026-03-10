import React from "react";
import { Menu, MessageCircle, Send, Phone } from "lucide-react";

const MobileBottomNav = ({ openMenu, openQuery }) => {

return (

<div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around items-center py-2 z-[9999] lg:hidden">

{/* MENU */}

<button
onClick={openMenu}
className="flex flex-col items-center text-gray-700 text-xs font-medium"

>

<Menu size={22}/>
<span>Menu</span>

</button>

{/* WHATSAPP */}

<a
href="https://wa.me/917827372844"
target="_blank"
rel="noreferrer"
className="flex flex-col items-center text-green-600 text-xs font-medium"

>

<MessageCircle size={22}/>
<span>WhatsApp</span>

</a>

{/* QUERY */}

<button
onClick={openQuery}
className="flex flex-col items-center text-blue-600 text-xs font-medium"

>

<Send size={22}/>
<span>Query</span>

</button>

{/* CALL */}

<a
href="tel:+917827372844"
className="flex flex-col items-center text-red-500 text-xs font-medium"

>

<Phone size={22}/>
<span>Call</span>

</a>

</div>

);

};

export default MobileBottomNav;
