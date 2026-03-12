import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Wallet, Headphones, ChevronLeft, ChevronRight } from 'lucide-react';

import Hero from '../components/Hero';
import Categories from '../components/Categories';
import UpcomingTrips from '../components/UpcomingTrips';
import Reels from '../components/Reels';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import ImageGallery from '../components/ImageGallery';
import TravelerReviews from "../components/TravelerReviews";

const Home = () => {

const [openFaq, setOpenFaq] = React.useState(null);
const sliderRef = React.useRef(null);

const toggleFaq = (index) => {
setOpenFaq(openFaq === index ? null : index);
};

const scrollLeft = () => {
sliderRef.current.scrollBy({ left: -350, behavior: "smooth" });
};

const scrollRight = () => {
sliderRef.current.scrollBy({ left: 350, behavior: "smooth" });
};

const [searchQuery, setSearchQuery] = React.useState("");
const navigate = useNavigate();

const handleSearch = (e) => {
e.preventDefault();
if (!searchQuery.trim()) return;

const query = searchQuery.toLowerCase().trim();

if (query.includes("himachal")) navigate("/state/himachal");
else if (query.includes("uttarakhand") || query.includes("uk")) navigate("/state/uttarakhand");
else if (query.includes("rajasthan")) navigate("/state/rajasthan");
else if (query.includes("kashmir")) navigate("/state/kashmir");
else if (query.includes("goa")) navigate("/state/goa");
else {
alert("Searching for: " + searchQuery);
}
};

return (

<main className="pt-[120px] flex-grow">

<Hero />

{/* WHY CHOOSE US */}

<section className="py-10 md:py-20 bg-gray-50">

<div className="container mx-auto px-4 max-w-7xl">

<div className="text-center mb-12">

<h2 className="text-2xl md:text-5xl font-bold text-[#1a2b4c] mb-4 uppercase tracking-tight">
Why Ghoomo Saste Me?
</h2>

<p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-lg">
We don't just sell trips; we create stories that fit your budget.
</p>

</div>

<div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible px-2 scrollbar-hide">

<div className="min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition">
<div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
<Wallet size={26}/>
</div>
<h3 className="text-lg font-semibold text-[#1a2b4c] mb-2">Pocket Friendly</h3>
<p className="text-gray-500 text-sm">Budget travel with premium experiences.</p>
</div>

<div className="min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition">
<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
<ShieldCheck size={26}/>
</div>
<h3 className="text-lg font-semibold text-[#1a2b4c] mb-2">Safe & Secure</h3>
<p className="text-gray-500 text-sm">Female friendly and 24/7 support.</p>
</div>

<div className="min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition">
<div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
<Users size={26}/>
</div>
<h3 className="text-lg font-semibold text-[#1a2b4c] mb-2">Expert Guides</h3>
<p className="text-gray-500 text-sm">Trip leaders who know hidden gems.</p>
</div>

<div className="min-w-[220px] md:min-w-0 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition">
<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
<Headphones size={26}/>
</div>
<h3 className="text-lg font-semibold text-[#1a2b4c] mb-2">Always Online</h3>
<p className="text-gray-500 text-sm">Help is always one WhatsApp away.</p>
</div>

</div>
</div>

</section>

{/* DESTINATIONS */}

<section className="py-12 bg-white">

<div className="container mx-auto px-4 max-w-7xl">

<div className="flex justify-between items-center mb-10">

<div className="text-left">

<h2 className="text-2xl md:text-4xl font-bold text-[#1a2b4c]">
Explore by Destination
</h2>

<p className="text-gray-500 text-sm md:text-lg">
Choose your next adventure from our handpicked states across India.
</p>

</div>

<div className="hidden md:flex gap-3">

<button
onClick={scrollLeft}
className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"

>

<ChevronLeft size={20}/>
</button>

<button
onClick={scrollRight}
className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100"

>

<ChevronRight size={20}/>
</button>

</div>

</div>

<div
ref={sliderRef}
className="flex gap-5 overflow-x-auto md:overflow-x-auto scroll-smooth scrollbar-hide"
>

{/* HIMACHAL */}

<Link to="/state/himachal"
className="group min-w-[75%] sm:min-w-[300px] relative h-72 rounded-2xl overflow-hidden shadow-lg block">

<img
src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23"
alt="Himachal Pradesh"
className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

<div className="absolute bottom-0 left-0 w-full p-5 text-white">

<h3 className="text-xl md:text-2xl font-semibold">Himachal Pradesh</h3>
<p className="text-sm text-gray-200">10+ Trips Available</p>

</div>

</Link>

{/* UTTARAKHAND */}

<Link to="/state/uttarakhand"
className="group min-w-[75%] sm:min-w-[300px] relative h-72 rounded-2xl overflow-hidden shadow-lg block">

<img src="/uttarakhand.png"
alt="Uttarakhand"
className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

<div className="absolute bottom-0 left-0 w-full p-5 text-white">

<h3 className="text-xl md:text-2xl font-semibold">Uttarakhand</h3>
<p className="text-sm text-gray-200">Opening Soon</p>

</div>

</Link>

{/* RAJASTHAN */}

<Link to="/state/rajasthan"
className="group min-w-[75%] sm:min-w-[300px] relative h-72 rounded-2xl overflow-hidden shadow-lg block">

<img src="https://images.unsplash.com/photo-1477587458883-47145ed94245"
alt="Rajasthan"
className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

<div className="absolute bottom-0 left-0 w-full p-5 text-white">

<h3 className="text-xl md:text-2xl font-semibold">Rajasthan</h3>
<p className="text-sm text-gray-200">10+ Trips Available</p>

</div>

</Link>

{/* KASHMIR */}

<Link to="/trip/kashmir-volvo-special"
className="group min-w-[75%] sm:min-w-[300px] relative h-72 rounded-2xl overflow-hidden shadow-lg block">

<img src="/kashmir.png"
alt="Kashmir"
className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>

<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

<div className="absolute bottom-0 left-0 w-full p-5 text-white">

<h3 className="text-xl md:text-2xl font-semibold">Kashmir</h3>
<p className="text-sm text-gray-200">2 Trips Available</p>

</div>

</Link>

</div>

</div>

</section>

<Categories />

<UpcomingTrips />

<TravelerReviews />

<ImageGallery />

<Reels />

<Reviews />

<FAQ />

</main>
);
};

export default Home;
