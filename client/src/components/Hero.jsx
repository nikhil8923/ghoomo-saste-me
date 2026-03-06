import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    if (query.includes("himachal")) navigate("/state/himachal");
    else if (query.includes("uttarakhand") || query.includes("uk")) navigate("/state/uttarakhand");
    else if (query.includes("rajasthan")) navigate("/state/rajasthan");
    else if (query.includes("kashmir")) navigate("/state/kashmir");
    else if (query.includes("goa")) navigate("/state/goa");
  };

  return (
    <section className="relative h-[75vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* --- THE VIDEO ELEMENT --- */}
      {/* --- LOCAL BACKGROUND VIDEO --- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ opacity: 0.6 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10"></div>
      
      <div className="relative z-20 w-full max-w-5xl px-4 text-center">
        <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl leading-tight uppercase italic tracking-tighter">
          Pocket friendly trips, <br /> unforgettable memories
        </h1>

        <p className="text-blue-200 text-lg md:text-xl mb-10 font-bold uppercase tracking-widest drop-shadow-md">
          Explore India like never before
        </p>

        {/* --- SEARCH BAR --- */}
        <form 
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md p-2 rounded-full flex items-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-w-2xl mx-auto border-2 border-white/20 focus-within:border-blue-500 transition-all"
        >
          <div className="pl-5 text-gray-400 hidden sm:block">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Where do you want to go?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 text-gray-800 text-lg outline-none bg-transparent font-semibold"
          />
          <button 
            type="submit"
            className="bg-[#1e52bc] hover:bg-black text-white px-10 py-3.5 rounded-full font-black uppercase italic tracking-tight transition-all shadow-lg active:scale-95"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;