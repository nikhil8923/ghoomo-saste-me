import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
MapPin,
Clock,
CheckCircle,
XCircle,
ChevronRight,
X
} from "lucide-react";

import { tripsData } from "../data/trips";
import BookingModal from "../components/BookingModal";

const TripDetails = () => {

const { id } = useParams();

const [currentTrip,setCurrentTrip] = useState(null);
const [activeTab,setActiveTab] = useState("itinerary");
const [isModalOpen,setIsModalOpen] = useState(false);
const [galleryOpen,setGalleryOpen] = useState(false);

/* NEW PRICE STATE */
const [selectedPrice,setSelectedPrice] = useState("quad");

useEffect(()=>{

const foundTrip = tripsData.find((t)=> t && t.id === id);
setCurrentTrip(foundTrip);
window.scrollTo(0,0);

},[id]);

if(!currentTrip){
return(

<div className="h-screen flex items-center justify-center">
Loading Trip...
</div>
);
}

/* GALLERY IMAGES */

const images = [
{src: currentTrip.image},
...(currentTrip.gallery || [])
];

return(

<main className="pt-28 pb-32 md:pb-20 bg-[#f4f7f6] min-h-screen">

<div className="max-w-7xl mx-auto px-4">

{/* ================= IMAGE GALLERY ================= */}

<div className="mt-4 mb-4 grid grid-cols-1 md:grid-cols-12 gap-4">

<div className="md:col-span-7 rounded-[28px] overflow-hidden">
<img
src={images[0]?.src}
className="w-full h-auto object-cover rounded-[28px]"
alt=""
/>
</div>

<div className="md:col-span-5 grid grid-cols-2 gap-4 auto-rows-max">

{images.slice(1,5).map((img,i)=>(

<div key={i} className="rounded-[18px] overflow-hidden">

<img
src={img?.src}
className="w-full h-auto object-cover rounded-[18px]"
alt=""
/>

</div>

))}

<div className="relative cursor-pointer rounded-[18px] overflow-hidden col-span-2">

<img
src={images[5]?.src || images[0]?.src}
className="w-full h-[180px] object-cover brightness-75"
alt=""
/>

<div className="absolute inset-0 flex items-center justify-center">

<button
onClick={()=>setGalleryOpen(true)}
className="bg-white px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"

>

View More </button>

</div>

</div>

</div>

</div>

{/* ================= MAIN CONTENT ================= */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

{/* LEFT SECTION */}

<div className="lg:col-span-8">

{/* TITLE */}

<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">

<h1 className="text-3xl md:text-5xl font-extrabold uppercase text-slate-900 leading-tight">
{currentTrip.title}
</h1>

{currentTrip.itineraryPdf && (

<a
href={currentTrip.itineraryPdf}
download
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold uppercase text-sm hover:bg-black transition shadow-md"

>

Download Itinerary </a>

)}

</div>

{/* LOCATION */}

<div className="flex gap-6 text-slate-500 mb-8">

<span className="flex gap-2 items-center">
<MapPin size={16}/> {currentTrip.pickup || currentTrip.location}
</span>

<span className="flex gap-2 items-center">
<Clock size={16}/> {currentTrip.duration}
</span>

</div>

{/* ================= ITINERARY OVERVIEW ================= */}

{currentTrip.itineraryBrief && (

<div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">

<h2 className="text-lg font-bold text-blue-700 mb-4 uppercase">
Itinerary Overview
</h2>

<div className="space-y-2 text-sm text-slate-700">

{currentTrip.itineraryBrief.map((item,i)=>(

<div key={i} className="flex gap-2">
<span className="font-semibold text-blue-600">•</span>
<p>{item}</p>
</div>

))}

</div>

</div>

)}

{/* ================= PRICING PLAN ================= */}

<div className="mb-6">

<h2 className="text-lg font-extrabold uppercase text-center mb-3">
Pricing Plan
</h2>

<div className="flex md:grid md:grid-cols-3 gap-2 overflow-x-auto md:overflow-visible pb-2">

{/* QUAD */}

<div
onClick={()=>setSelectedPrice("quad")}
className={`min-w-[120px] md:min-w-0 border-2 rounded-lg p-2 md:p-4 text-center cursor-pointer transition
${selectedPrice==="quad" ? "bg-yellow-400 border-black" : "bg-yellow-300 border-black hover:bg-yellow-400"}
`}
>
<p className="font-bold text-[10px] md:text-sm">QUAD</p>

<div className="bg-gray-200 border border-black rounded-md mt-1 px-2 py-1">
<p className="font-bold text-xs md:text-lg">₹5000</p>
</div>

</div>

{/* TRIPLE */}

<div
onClick={()=>setSelectedPrice("triple")}
className={`min-w-[120px] md:min-w-0 border-2 rounded-lg p-2 md:p-4 text-center cursor-pointer transition
${selectedPrice==="triple" ? "bg-yellow-400 border-black" : "bg-yellow-300 border-black hover:bg-yellow-400"}
`}
>
<p className="font-bold text-[10px] md:text-sm">TRIPLE</p>

<div className="bg-gray-200 border border-black rounded-md mt-1 px-2 py-1">
<p className="font-bold text-xs md:text-lg">₹6000</p>
</div>

</div>

{/* DOUBLE */}

<div
onClick={()=>setSelectedPrice("double")}
className={`min-w-[120px] md:min-w-0 border-2 rounded-lg p-2 md:p-4 text-center cursor-pointer transition
${selectedPrice==="double" ? "bg-yellow-400 border-black" : "bg-yellow-300 border-black hover:bg-yellow-400"}
`}
>
<p className="font-bold text-[10px] md:text-sm">DOUBLE</p>

<div className="bg-gray-200 border border-black rounded-md mt-1 px-2 py-1">
<p className="font-bold text-xs md:text-lg">₹7000</p>
</div>

</div>

</div>

{/* PRICE DETAILS */}

<div className="mt-3 bg-white border rounded-lg p-4 text-xs md:text-sm text-slate-600">

{selectedPrice==="quad" && (

<ul className="space-y-1">
<li>✔ Quad Sharing Stay</li>
<li>✔ Dinner+Breakfast</li>
<li>✔ Transport Support</li>
<li>✔ Trek Guide</li>
</ul>
)}

{selectedPrice==="triple" && (

<ul className="space-y-1">
<li>✔ Triple Sharing Stay</li>
<li>✔ Dinner + Breakfast</li>
<li>✔ Transport Support</li>
<li>✔ Trek Guide</li>
</ul>
)}

{selectedPrice==="double" && (

<ul className="space-y-1">
<li>✔ Double Sharing Room</li>
<li>✔ Dinner + Breakfast</li>
<li>✔ Transport Support</li>
<li>✔ Trek Guide</li>
</ul>
)}

</div>

</div>

{/* ================= TABS ================= */}

<div className="flex bg-white rounded-xl p-2 mb-8 border">

{["itinerary","inclusions","exclusions"].map(tab=>(

<button
key={tab}
onClick={()=>setActiveTab(tab)}
className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase
${activeTab===tab ? "bg-blue-600 text-white":"text-slate-400"}`}

>

{tab} </button>

))}

</div>

{/* ================= TAB CONTENT ================= */}

<div className="bg-white p-8 rounded-[28px] border">

{activeTab==="itinerary" &&(

<div className="space-y-4">

{currentTrip.itinerary?.map((day,i)=>(

<details key={i} open={i===0} className="bg-slate-50 rounded-xl">

<summary className="flex justify-between p-5 cursor-pointer">

<div className="flex gap-4 items-center">

<span className="bg-blue-600 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold">
D{day.day}
</span>

<h3 className="font-bold uppercase">
{day.title}
</h3>

</div>

<ChevronRight/>

</summary>

<div className="px-6 pb-6 text-slate-500 text-sm">
{day.desc || day.description}
</div>

</details>

))}

</div>

)}

{activeTab==="inclusions" &&(

<div className="space-y-4">

{currentTrip.inclusions?.map((item,i)=>(

<div key={i} className="flex gap-3 items-start text-slate-700">
<CheckCircle className="text-green-500 mt-1" size={18}/>
<p>{item}</p>
</div>

))}

</div>

)}

{activeTab==="exclusions" &&(

<div className="space-y-4">

{currentTrip.exclusions?.map((item,i)=>(

<div key={i} className="flex gap-3 items-start text-slate-700">
<XCircle className="text-red-500 mt-1" size={18}/>
<p>{item}</p>
</div>

))}

</div>

)}

</div>

{/* ================= TRAVEL INFORMATION ================= */}

<div className="mt-12">

<h2 className="text-2xl font-extrabold mb-6 uppercase text-slate-900">
Travel Information
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{currentTrip.addons && (

<div className="bg-white rounded-2xl border shadow-sm p-6">

<h3 className="text-lg font-bold text-blue-600 uppercase mb-4">
Addons
</h3>

<ul className="space-y-2 text-sm text-slate-600">

{currentTrip.addons.map((item,i)=>(

<li key={i}>• {item}</li>
))}

</ul>

</div>

)}

{currentTrip.bestTimeToVisit && (

<div className="bg-white rounded-2xl border shadow-sm p-6">

<h3 className="text-lg font-bold text-green-600 uppercase mb-4">
Best Time To Visit
</h3>

<ul className="space-y-2 text-sm text-slate-600">

{currentTrip.bestTimeToVisit.map((item,i)=>(

<li key={i}>• {item}</li>
))}

</ul>

</div>

)}

{currentTrip.travelTips && (

<div className="bg-white rounded-2xl border shadow-sm p-6">

<h3 className="text-lg font-bold text-orange-500 uppercase mb-4">
Travel Tips
</h3>

<ul className="space-y-2 text-sm text-slate-600">

{currentTrip.travelTips.map((item,i)=>(

<li key={i}>• {item}</li>
))}

</ul>

</div>

)}

</div>

</div>

{/* ================= THINGS TO CARRY ================= */}

{currentTrip.thingsToCarry && (

<div className="mt-12">

<h2 className="text-2xl font-extrabold mb-6 uppercase text-slate-900">
Things To Carry
</h2>

<div className="bg-white rounded-2xl border shadow-sm p-6">

<ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-700">

{currentTrip.thingsToCarry.map((item,i)=>(

<li key={i} className="flex gap-2">
<span className="text-blue-600 font-bold">•</span>
{item}
</li>

))}

</ul>

</div>

</div>

)}

</div>

{/* SIDEBAR */}

<div className="lg:col-span-4 hidden md:block">

<div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white p-8 rounded-3xl sticky top-24 shadow-2xl">

<p className="text-xs uppercase mb-3 text-blue-400">
Starting Price / Per Person
</p>

<h2 className="text-5xl font-black mb-6">
₹5000
</h2>

<button
onClick={()=>setIsModalOpen(true)}
className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-4 rounded-2xl font-bold uppercase tracking-wide text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-200"

>

Book Your Slot </button>

</div>

</div>

</div>

</div>

{/* ================= GALLERY MODAL ================= */}

{galleryOpen && (

<div className="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center p-6">

<button
onClick={()=>setGalleryOpen(false)}
className="absolute top-6 right-6 text-white"

>

<X size={32}/>
</button>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl overflow-y-auto max-h-[90vh]">

{images.map((img,i)=>(

<img
key={i}
src={img.src}
className="rounded-xl object-cover"
/>

))}

</div>

</div>

)}

{/* ================= MOBILE BOOK BUTTON ================= */}

<div className="md:hidden fixed bottom-20 left-0 w-full px-4 z-[999]">

<button
onClick={()=>setIsModalOpen(true)}
className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition"

>

Book Your Slot • ₹5000 </button>

</div>

{/* ================= BOOKING MODAL ================= */}

<BookingModal
isOpen={isModalOpen}
onClose={()=>setIsModalOpen(false)}
tripTitle={currentTrip.title}
/>

</main>

);

};

export default TripDetails;
