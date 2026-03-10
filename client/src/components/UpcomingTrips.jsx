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
container.scrollBy({ left: -320, behavior: "smooth" });
}else{
container.scrollBy({ left: 320, behavior: "smooth" });
}

};

return (

<section id="upcoming-trips" className="py-16 bg-[#f7f9fc]">

<div className="max-w-7xl mx-auto px-4">

{/* HEADER */}

<div className="flex justify-between items-center mb-10">

<h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2b4c]">
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
className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 hide-scrollbar"
>

{featuredTrips.map((trip)=> (

<div
key={trip.id}
className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl shadow-md hover:shadow-xl transition snap-start overflow-hidden flex flex-col"
>

{/* IMAGE */}

<div className="relative h-52 overflow-hidden">

<img
src={trip.image}
alt={trip.title}
className="w-full h-full object-cover"
/>

{/* BADGE */}

<div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
Trending
</div>

</div>

{/* CONTENT */}

<div className="p-5 flex flex-col flex-grow">

<h3 className="text-lg font-bold text-[#1a2b4c] mb-1 line-clamp-1">
{trip.title}
</h3>

<div className="text-sm text-gray-500 mb-3">
{trip.duration}
</div>

<p className="text-sm text-gray-500 line-clamp-2 mb-4">
{trip.description}
</p>

<div className="flex justify-between items-center mt-auto">

<div>

<span className="text-xs text-gray-400 line-through block">
₹{trip.originalPrice}
</span>

<span className="text-lg font-extrabold text-gray-900">
₹{trip.price}
</span>

</div>

<Link
to={`/trip/${trip.id}`}
className="bg-[#1a2b4c] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
>

View Trip

</Link>

</div>

</div>

</div>

))}

</div>

{/* VIEW ALL */}

<div className="text-center mt-8">

<Link
to="/trips"
className="inline-block bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-xl font-bold"
>

View All Trips

</Link>

</div>

</div>

</section>

);

};


export default UpcomingTrips;