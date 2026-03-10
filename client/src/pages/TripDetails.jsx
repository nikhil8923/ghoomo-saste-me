import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
MapPin,
Clock,
CheckCircle,
XCircle,
ChevronRight
} from "lucide-react";

import { tripsData } from "../data/trips";
import BookingModal from "../components/BookingModal";

const TripDetails = () => {

const { id } = useParams();

const [currentTrip, setCurrentTrip] = useState(null);
const [activeTab, setActiveTab] = useState("itinerary");
const [isModalOpen, setIsModalOpen] = useState(false);

const [galleryOpen, setGalleryOpen] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

useEffect(() => {

const foundTrip = tripsData.find((t) => t && t.id === id);
setCurrentTrip(foundTrip);
window.scrollTo(0,0);

},[id]);

if (!currentTrip) {
return (
<div className="h-screen flex items-center justify-center">
Loading Trip...
</div>
);
}

/* FORCE PRICE */

const currentPrice = 5000;

const images = [
{src: currentTrip.image},
...(currentTrip.gallery || [])
];

return (

<main className="pt-32 pb-40 md:pb-20 bg-[#f4f7f6] min-h-screen">

<div className="max-w-7xl mx-auto px-4">

{/* IMAGE GALLERY */}

<div className="mt-10 mb-12 grid grid-cols-1 md:grid-cols-12 gap-4 h-[420px] md:h-[520px]">

<div className="md:col-span-7 rounded-[30px] overflow-hidden">

<img
src={images[0]?.src}
className="w-full h-full object-cover hover:scale-105 transition"
alt=""
/>

</div>

<div className="md:col-span-5 grid grid-cols-2 grid-rows-2 gap-4">

{images.slice(1,4).map((img,i)=>(

<img
key={i}
src={img?.src}
className="w-full h-full object-cover rounded-[20px]"
alt=""
/>

))}

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

{/* MAIN CONTENT */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

{/* LEFT */}

<div className="lg:col-span-8">

<h1 className="text-4xl md:text-5xl font-black uppercase italic mb-6">
{currentTrip.title}
</h1>

<div className="flex gap-6 text-slate-400 mb-8">

<span className="flex gap-2 items-center">
<MapPin size={16}/> {currentTrip.pickup}
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

{/* DESKTOP SIDEBAR */}

<div className="lg:col-span-4 hidden md:block">

<div className="bg-[#0f172a] text-white p-10 rounded-[40px] sticky top-24">

<p className="text-xs uppercase mb-3 text-blue-400">
Starting Price
</p>

<h2 className="text-5xl font-black mb-6">
₹{currentPrice}
</h2>

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



<BookingModal
isOpen={isModalOpen}
onClose={()=>setIsModalOpen(false)}
tripTitle={currentTrip.title}
selectedPrice={currentPrice}
/>

</main>

);

};

export default TripDetails;