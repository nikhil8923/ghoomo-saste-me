import React from "react";
import { Link } from "react-router-dom";

const categories = [
{
title: "Backpacking",
image: "/backpack.jpg",
path: "/category/backpacking"
},
{
title: "Weekend Trips",
image: "/weekend.jpg",
path: "/category/weekend"
},
{
title: "Adventure Treks",
image: "/adventure.jpg",
path: "/category/adventure"
},
{
title: "Kashmir",
image: "/kashmir2.jpg",
path: "/trip/kashmir-volvo-special"
},
{
title: "Uttarakhand",
image: "/uttarakhand2.jpg",
path: "/category/uttarakhand"
},
{
title: "Corporate Tours",
image: "/corporate.jpg",
path: "/corporate"
}
];

const Categories = () => {

return (

<section className="py-16 bg-gray-50">

<div className="max-w-7xl mx-auto px-4">

{/* TITLE */}

<div className="text-center mb-12">

<h2 className="text-3xl md:text-4xl font-bold text-[#1a2b4c] mb-2">
Explore Categories
</h2>

<p className="text-gray-500">
Find your perfect travel experience
</p>

</div>

{/* OVAL GRID */}

<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center">

{categories.map((cat,index)=>(

<Link
to={cat.path}
key={index}
className="group flex flex-col items-center"
>

{/* IMAGE */}

<div className="w-[110px] h-[150px] md:w-[130px] md:h-[180px] rounded-[60px] overflow-hidden shadow-md group-hover:shadow-xl transition-all">

<img
src={cat.image}
alt={cat.title}
className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
/>

</div>

{/* TITLE */}

<p className="mt-3 text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition">

{cat.title}

</p>

</Link>

))}

</div>

</div>

</section>

);

};

export default Categories;
