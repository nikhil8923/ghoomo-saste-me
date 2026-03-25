import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { tripsData } from "../data/trips";

const UpcomingTrips = () => {

const scrollRef = useRef(null);

// Show only first 6 trips
const featuredTrips = tripsData.slice(0,6);

const scroll = (direction) => {

const container = scrollRef.current;

if(direction === "left"){
container.scrollBy({ left: -260, behavior: "smooth" });
}else{
container.scrollBy({ left: 260, behavior: "smooth" });
}

};

return (

<section id="upcoming-trips" className="py-10 md:py-16 bg-[#f7f9fc]">

<div className="max-w-7xl mx-auto px-3 md:px-4">

{/* HEADER */}

<div className="flex justify-between items-center mb-6 md:mb-10">

<h2 className="text-2xl md:text-4xl font-extrabold text-[#1a2b4c]">
Upcoming Trips
</h2>

<div className="hidden md:flex gap-3">

<button
onClick={()=>scroll("left")}
className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
>
←
</button>

<button
onClick={()=>scroll("right")}
className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"
>
→
</button>

</div>

</div>

{/* SLIDER */}

<div
ref={scrollRef}
className="flex gap-3 md:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 md:pb-6 hide-scrollbar"
>

{featuredTrips.map((trip)=> (

<div
key={trip.id}
className="min-w-[200px] md:min-w-[260px] bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition snap-start overflow-hidden flex flex-col"
>

{/* IMAGE */}

<div className="relative h-28 md:h-40 overflow-hidden">

<img
src={trip.image}
alt={trip.title}
className="w-full h-full object-cover"
/>

{/* BADGE */}

<div className="absolute top-2 left-2 bg-yellow-400 text-black text-[9px] md:text-[10px] font-bold px-2 py-1 rounded-full">
Trending
</div>

</div>

{/* CONTENT */}

<div className="p-3 md:p-4 flex flex-col flex-grow">

<h3 className="text-[13px] md:text-base font-bold text-[#1a2b4c] mb-1 line-clamp-1">
{trip.title}
</h3>

<div className="text-[11px] md:text-xs text-gray-500 mb-1">
{trip.duration}
</div>

<p className="text-[11px] md:text-xs text-gray-500 line-clamp-2 mb-2">
{trip.description}
</p>

<div className="flex justify-between items-center mt-auto">

<div>

<span className="text-[9px] md:text-[10px] text-gray-400 line-through block">
₹{trip.originalPrice}
</span>

<span className="text-[14px] md:text-base font-extrabold text-gray-900">
₹{trip.price}
</span>

</div>

<Link
to={`/trip/${trip.id}`}
className="bg-[#1a2b4c] text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg text-[11px] md:text-xs font-semibold hover:bg-blue-700"
>
View Trip
</Link>

</div>

</div>

</div>

))}

</div>

{/* VIEW ALL */}

<div className="text-center mt-6 md:mt-8">

<Link
to="/trips"
className="inline-block bg-yellow-400 hover:bg-yellow-500 px-5 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base"
>
View All Trips
</Link>

</div>

</div>

</section>

);

};

export default UpcomingTrips;