import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ArrowLeft, Clock, Bell, Phone } from "lucide-react";
import { tripsData } from "../data/trips";

const StateTrips = () => {

const { stateId } = useParams();

useEffect(() => {
window.scrollTo(0,0);
},[stateId]);

const stateTrips = tripsData.filter(trip => trip.stateId === stateId);

const formatStateName = (id) => {

const names = {
himachal:"Himachal Pradesh",
uttarakhand:"Uttarakhand",
rajasthan:"Rajasthan",
kashmir:"Kashmir",
goa:"Goa"
};

return names[id] || id.toUpperCase();

};

const handleNotifyMe = () => {

const phoneNumber = "918265977349";

const message =
`Hi Ghoomo Saste Me! I'm interested in the upcoming trips for ${formatStateName(stateId)}. Please notify me when they are live!`;

const whatsappUrl =
`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

window.open(whatsappUrl,"_blank");

};

return (

<main className="pt-[115px] flex-grow bg-gray-50 pb-16 min-h-screen">

{/* ================= HEADER BANNER ================= */}

<div className="relative h-[340px] md:h-[440px] flex items-center justify-center overflow-hidden">

{/* BACKGROUND IMAGE */}

<img
src={`/${stateId}-banner.jpg`}
alt={formatStateName(stateId)}
className="absolute inset-0 w-full h-full object-cover"
/>

{/* LIGHT OVERLAY */}

<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

{/* CONTENT */}

<div className="relative z-10 text-center px-4">

<h1 className="text-4xl md:text-6xl font-bold text-white mb-3 tracking-wide drop-shadow-xl">
{formatStateName(stateId)}
</h1>

<p className="text-gray-200 text-lg max-w-xl mx-auto">
Explore our handpicked trips in {formatStateName(stateId)}.
</p>

</div>

</div>

{/* ================= PAGE CONTENT ================= */}

<div className="container mx-auto px-4 max-w-7xl mt-12">

<Link
to="/"
className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-bold w-fit"
>

<ArrowLeft size={18}/>
Back to Home

</Link>

{/* ================= IF NO TRIPS ================= */}

{stateTrips.length === 0 ? (

<div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-10 md:p-16 text-center shadow-xl">

<Clock size={40} className="mx-auto text-blue-600 mb-6"/>

<h2 className="text-4xl font-bold text-[#1a2b4c] mb-4">
{formatStateName(stateId)} Coming Soon
</h2>

<p className="text-gray-500 mb-8">
We are crafting amazing itineraries for this destination.
</p>

<button
onClick={handleNotifyMe}
className="flex items-center gap-2 mx-auto bg-yellow-400 px-8 py-3 rounded-full font-bold hover:bg-yellow-500"

>

<Bell size={18}/>
Notify on WhatsApp

</button>

</div>

) : (

/* ================= TRIP CARDS ================= */

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

{stateTrips.map((trip)=> (

<div
key={trip.id}
className="relative rounded-2xl overflow-hidden shadow-xl group"
>

{/* IMAGE */}

<img
src={trip.image}
alt={trip.title}
className="w-full h-[340px] object-cover group-hover:scale-105 transition duration-700"
/>

{/* DARK GRADIENT */}

<div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

{/* STATE BADGE */}

<div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1">

<MapPin size={12}/>
{formatStateName(stateId)}

</div>

{/* CARD CONTENT */}

<div className="absolute bottom-0 p-6 text-white w-full">

{/* DURATION */}

<div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
{trip.duration}
</div>

{/* TITLE */}

<h3 className="text-lg font-semibold mb-2">
{trip.title}
</h3>

{/* PRICE */}

<div className="text-sm mb-4">

<span className="line-through opacity-70 mr-2">
₹{trip.originalPrice}
</span>

<span className="text-lg font-bold">
₹{trip.price}
</span>

<span className="text-xs"> / person</span>

</div>

{/* BUTTONS */}

<div className="flex items-center gap-3">

<a
href="tel:+917827372844"
className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full shadow hover:bg-gray-100"

>

<Phone size={18}/>

</a>

<Link
to={`/trip/${trip.id}`}
className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200"
>

Trip Details

</Link>

</div>

</div>

</div>

))}

</div>

)}

</div>

</main>

);

};

export default StateTrips;
