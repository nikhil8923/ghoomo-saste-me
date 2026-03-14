import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
MapPin,
Clock,
CheckCircle,
XCircle,
ChevronRight,
ChevronLeft,
X
} from "lucide-react";

import { tripsData } from "../data/trips";
import BookingModal from "../components/BookingModal";

const TripDetails = () => {

const { id } = useParams();

const [currentTrip, setCurrentTrip] = useState(null);
const [activeTab, setActiveTab] = useState("itinerary");
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedBatch, setSelectedBatch] = useState(null);

const [galleryOpen, setGalleryOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {

const foundTrip = tripsData.find((t) => t && t.id === id);
setCurrentTrip(foundTrip);
window.scrollTo({ top: 0, behavior: "smooth" });

}, [id]);

if (!currentTrip) {
return (

<div className="h-screen flex items-center justify-center">
Loading Trip...
</div>
);
}

const currentPrice =
selectedBatch?.price ||
currentTrip?.batches?.[0]?.price ||
currentTrip.price;

const images = [
{ src: currentTrip.image },
...(currentTrip.gallery || [])
];

const nextImage = () => {
setCurrentImageIndex((prev) =>
prev === images.length - 1 ? 0 : prev + 1
);
};

const prevImage = () => {
setCurrentImageIndex((prev) =>
prev === 0 ? images.length - 1 : prev - 1
);
};

return (

<main className="pt-32 pb-40 md:pb-20 bg-[#f4f7f6] min-h-screen">

<div className="max-w-7xl mx-auto px-4">

{/* ================= GALLERY ================= */}

<div className="mt-10 mb-24 grid grid-cols-1 md:grid-cols-12 gap-4">

<div className="md:col-span-7 h-[420px] rounded-[30px] overflow-hidden">

<img
src={images[0]?.src}
className="w-full h-full object-cover"
alt=""
/>

</div>

<div className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-4 h-[420px]">

{[0,1,2].map((i)=>{

const img = images[i+1];

return (

<div key={i} className="rounded-[20px] overflow-hidden bg-gray-200">

{img ? (

<img
src={img.src}
className="w-full h-full object-cover"
alt=""
/>

) : (

<div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
No Image
</div>

)}

</div>

);

})}

<div
onClick={()=>{
setGalleryOpen(true);
setCurrentImageIndex(0);
document.body.style.overflow="hidden";
}}
className="relative cursor-pointer rounded-[20px] overflow-hidden"
>

<img
src={images[4]?.src || images[0]?.src}
className="w-full h-full object-cover brightness-75"
alt=""
/>

<div className="absolute inset-0 flex items-center justify-center">

<button className="bg-white px-5 py-2 rounded-xl font-bold">
View More
</button>

</div>

</div>

</div>

</div>

{/* ================= MAIN CONTENT ================= */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

<div className="lg:col-span-8">

<h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
{currentTrip.title}
</h1>

<div className="flex gap-8 text-slate-500 font-medium mb-10 items-center">

<span className="flex gap-2 items-center">
<MapPin size={16}/> {currentTrip.pickup || currentTrip.location}
</span>

<span className="flex gap-2 items-center">
<Clock size={16}/> {currentTrip.duration}
</span>

</div>

{/* TABS */}

<div className="flex bg-white rounded-xl p-2 mb-8 border">

{["itinerary","inclusions","exclusions"].map(tab => (

<button
key={tab}
onClick={()=>setActiveTab(tab)}
className={`flex-1 py-3 rounded-lg text-sm font-bold uppercase
${activeTab===tab ? "bg-blue-600 text-white":"text-slate-400"}`}

>

{tab}

</button>

))}

</div>

{/* TAB CONTENT */}

<div className="bg-white p-8 rounded-[30px] border">

{activeTab==="itinerary" && (

<div className="space-y-4">

{currentTrip.itinerary?.map((day,i)=>(

<details
key={i}
open={i===0}
className="bg-slate-50 rounded-xl border border-slate-200"
>

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

{activeTab==="inclusions" && (

<div className="space-y-4">

{currentTrip.inclusions?.map((item,i)=>(

<div key={i} className="flex gap-3">
<CheckCircle className="text-green-500"/>
{item}
</div>

))}

</div>

)}

{activeTab==="exclusions" && (

<div className="space-y-4">

{currentTrip.exclusions?.map((item,i)=>(

<div key={i} className="flex gap-3">
<XCircle className="text-red-500"/>
{item}
</div>

))}

</div>

)}

</div>

</div>

{/* ================= SIDEBAR ================= */}

<div className="lg:col-span-4 hidden md:block mt-6">

<div className="bg-[#0f172a] text-white p-10 rounded-[40px] sticky top-[180px] h-fit">

<p className="text-xs uppercase mb-3 text-blue-400">
Starting Price
</p>

<h2 className="text-5xl font-black mb-6">
₹{currentPrice}
</h2>

{currentTrip.batches && (

<div className="mb-6">

<p className="text-xs uppercase text-blue-400 mb-3">
Select Batch
</p>

<div className="space-y-2">

{currentTrip.batches.map((batch,i)=>{

const active =
selectedBatch?.date === batch.date ||
(!selectedBatch && i === 0);

return (

<button
key={i}
onClick={()=>setSelectedBatch(batch)}
className={`w-full flex justify-between items-center px-4 py-3 rounded-lg text-sm transition
${active
? "bg-blue-600 text-white"
: "bg-slate-800 hover:bg-slate-700 text-slate-200"
}`}

>

<span>{batch.date}</span> <span>₹{batch.price}</span>

</button>

);

})}

</div>

</div>

)}

<button
onClick={()=>setIsModalOpen(true)}
className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase"

>

Send Query Now

</button>

</div>

</div>

</div>

</div>

{/* ================= GALLERY MODAL ================= */}

{galleryOpen && (

<div className="fixed inset-0 bg-black/90 z-[99999] flex items-center justify-center">

<button
onClick={()=>{
setGalleryOpen(false);
document.body.style.overflow="auto";
}}
className="absolute top-6 right-6 text-white"

>

<X size={32}/>
</button>

<button
onClick={prevImage}
className="absolute left-6 text-white"

>

<ChevronLeft size={40}/>
</button>

<img
src={images[currentImageIndex]?.src}
className="max-h-[80vh] rounded-xl"
/>

<button
onClick={nextImage}
className="absolute right-6 text-white"

>

<ChevronRight size={40}/>
</button>

</div>

)}

{/* ================= MOBILE BOOKING BAR ================= */}

<div className="md:hidden fixed bottom-16 left-0 w-full bg-white border-t shadow-xl z-[9999] px-4 py-3">

<div className="flex items-center justify-between gap-3">

<div>

<p className="text-xs text-gray-500">Starting From</p>

<p className="font-bold text-lg text-slate-900">
₹{currentPrice}
</p>

</div>

<select
className="flex-1 border rounded-lg px-2 py-2 text-sm"
onChange={(e)=>{

const batch = currentTrip.batches?.find(
b => b.date === e.target.value
);

setSelectedBatch(batch);

}}

>

{currentTrip.batches?.map((batch,i)=>(

<option key={i} value={batch.date}>
{batch.date}
</option>

))}

</select>

<button
onClick={()=>setIsModalOpen(true)}
className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold"

>

Book Now

</button>

</div>

</div>

<BookingModal
isOpen={isModalOpen}
onClose={()=>setIsModalOpen(false)}
tripTitle={currentTrip.title}
selectedPrice={currentPrice}
selectedBatch={selectedBatch}
/>

</main>

);

};

export default TripDetails;
