import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

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
    <section className="relative h-[65vh] md:h-[85vh] w-full flex items-center justify-center overflow-hidden bg-black">

      {/* VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ opacity: 0.7 }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* HERO CONTENT */}
      <div className="relative z-20 w-full max-w-5xl px-4 text-center">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold italic text-white uppercase leading-tight drop-shadow-lg">
          Pocket Friendly Trips
          <br />
          Unforgettable Memories
        </h1>

        {/* SUBTITLE */}
        <p className="text-blue-200 text-sm sm:text-base md:text-xl mt-4 mb-8 font-semibold uppercase tracking-wider drop-shadow">
          Explore India Like Never Before
        </p>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="bg-white/95 backdrop-blur-md p-1.5 rounded-full flex items-center shadow-xl max-w-2xl mx-auto border border-white/20 focus-within:border-blue-500 transition-all"
        >

          <div className="pl-4 text-gray-400 hidden sm:block">
            <Search size={22} />
          </div>

          <input
            type="text"
            placeholder="Search destinations like Himachal, Kashmir..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 text-gray-800 text-sm md:text-base outline-none bg-transparent font-semibold"
          />

          <button
            type="submit"
            className="bg-[#1e52bc] hover:bg-black text-white px-6 md:px-8 py-2.5 rounded-full font-bold uppercase text-sm transition-all shadow-lg active:scale-95"
          >
            Search
          </button>

        </form>
      </div>
    </section>
  );
};

export default Hero;