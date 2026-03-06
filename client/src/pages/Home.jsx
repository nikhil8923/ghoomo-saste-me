import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Wallet, Headphones, Star, Plus, Minus } from 'lucide-react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import UpcomingTrips from '../components/UpcomingTrips';
import Reels from '../components/Reels';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';

const Home = () => {
  const [openFaq, setOpenFaq] = React.useState(null);

const toggleFaq = (index) => {
  setOpenFaq(openFaq === index ? null : index);
};
const [searchQuery, setSearchQuery] = React.useState("");
const navigate = useNavigate(); // Make sure to import { useNavigate } from 'react-router-dom'

const handleSearch = (e) => {
  e.preventDefault();
  if (!searchQuery.trim()) return;

  // We will redirect users to a search results page or filter the current view
  // For now, let's make it smart: if they type a state, take them to that state page!
  const query = searchQuery.toLowerCase().trim();
  
  if (query.includes("himachal")) navigate("/state/himachal");
  else if (query.includes("uttarakhand") || query.includes("uk")) navigate("/state/uttarakhand");
  else if (query.includes("rajasthan")) navigate("/state/rajasthan");
  else if (query.includes("kashmir")) navigate("/state/kashmir");
  else if (query.includes("goa")) navigate("/state/goa");
  else {
    // If it's a specific place like "Manali", we can eventually build a general search results page
    alert("Searching for: " + searchQuery);
  }
};
  return (
    <main className="pt-[115px] flex-grow">
      <Hero />
{/* --- WHY CHOOSE US SECTION --- */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-black text-[#1a2b4c] mb-4 uppercase italic tracking-tighter">
        Why Ghoomo Saste Me?
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-lg font-medium">
        We don't just sell trips; we create stories that fit your budget.
      </p>
    </div>
    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* 1. Pocket Friendly */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-yellow-400/20 rounded-2xl flex items-center justify-center text-[#1a2b4c] mb-6 group-hover:bg-[#ffcc00] transition-colors">
          <Wallet size={30} />
        </div>
        <h3 className="text-xl font-bold text-[#1a2b4c] mb-3">Pocket Friendly</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          The best experiences in India at prices that won't break your bank. Budget travel, premium vibes.
        </p>
      </div>

      {/* 2. Verified Stays */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <ShieldCheck size={30} />
        </div>
        <h3 className="text-xl font-bold text-[#1a2b4c] mb-3">Safe & Secure</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Female-friendly departures and 24/7 on-ground support to ensure your safety is never compromised.
        </p>
      </div>

      {/* 3. Community Driven */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
          <Users size={30} />
        </div>
        <h3 className="text-xl font-bold text-[#1a2b4c] mb-3">Expert Guides</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Travel with passionate trip leads who know the hidden gems that Google Maps can't find.
        </p>
      </div>

      {/* 4. 24/7 Support */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group">
        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <Headphones size={30} />
        </div>
        <h3 className="text-xl font-bold text-[#1a2b4c] mb-3">Always Online</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Have a doubt at 2 AM? Our team is just one WhatsApp message away to help you out.
        </p>
      </div>

    </div>
  </div>
</section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a2b4c] mb-4">Explore by Destination</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Choose your next adventure from our handpicked states across India.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. HIMACHAL PRADESH CARD */}
            <Link to="/state/himachal" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg block">
              {/* Note: I added a placeholder Unsplash image, you can swap this with your own! */}
              <img src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80" alt="Himachal Pradesh" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Himachal Pradesh</h3>
                <p className="text-sm text-gray-200 mb-4">10+ Trips Available</p>
                <span className="inline-block bg-[#ffcc00] text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide group-hover:bg-yellow-500 transition-colors">
                  Explore Now
                </span>
              </div>
            </Link>

            {/* 2. UTTARAKHAND CARD */}
            <Link to="/state/uttarakhand" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg block">
              <img src="/uttarakhand.png" alt="Uttarakhand" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Uttarakhand</h3>
                <p className="text-sm text-gray-200 mb-4">Opening Soon</p>
                <span className="inline-block bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  Explore Now
                </span>
              </div>
            </Link>

            {/* 3. RAJASTHAN CARD */}
            <Link to="/state/rajasthan" className="group relative h-80 rounded-2xl overflow-hidden shadow-lg block">
              <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80" alt="Rajasthan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Rajasthan</h3>
                <p className="text-sm text-gray-200 mb-4">10+ Trips Available</p>
                <span className="inline-block bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  Explore Now
                </span>
              </div>
            </Link>

            {/* 4. KASHMIR CARD */}
            <Link to={`/state/kashmir`} className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img src="/kashmir.png" alt="Kashmir" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Kashmir</h3>
                <p className="text-sm text-gray-200 mb-4">6+ Trips Available</p>
                <span className="inline-block bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  Explore Now
                </span>
              </div>
            </Link>
    

{/* --- 2. ADVENTURE TREKS CARD --- */}
<Link 
  to="/category/adventure" 
  className="relative group h-80 rounded-[32px] overflow-hidden shadow-xl block transition-transform hover:-translate-y-2"
>
  <img 
    src="/AdventureTrek.png" 
    alt="Adventure" 
    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
  />
   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">Adventure Treks</h3>
                <p className="text-sm text-gray-200 mb-4"> 3+ Trips Available</p>
                <span className="inline-block bg-white text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  Explore Now
                </span>
              </div>
</Link>
            

          </div>
        </div>
      </section>
      <Categories />
      <UpcomingTrips />
      <Reels />
      <Reviews />
      <FAQ />
    </main>
  );
};

export default Home;