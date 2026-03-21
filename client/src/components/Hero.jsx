import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("");
  const navigate = useNavigate();

  /* 🔥 TYPING EFFECT */
  const words = ["Himachal", "Kashmir", "Kedarnath", "Spiti Valley", "Goa"];
  useEffect(() => {
    let i = 0;
    let j = 0;
    let currentWord = "";
    let isDeleting = false;

    const type = () => {
      currentWord = words[i];

      if (isDeleting) {
        setPlaceholder(currentWord.substring(0, j--));
      } else {
        setPlaceholder(currentWord.substring(0, j++));
      }

      if (!isDeleting && j === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(type, 1000);
        return;
      }

      if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
      }

      setTimeout(type, isDeleting ? 50 : 100);
    };

    type();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.toLowerCase().trim();
    if (!query) return;

    if (query.includes("himachal") || query.includes("manali")) {
      navigate("/state/himachal");
    } else if (query.includes("kashmir")) {
      navigate("/state/kashmir");
    } else if (query.includes("uttarakhand") || query.includes("kedarnath")) {
      navigate("/state/uttarakhand");
    } else if (query.includes("spiti")) {
      navigate("/trip/spiti-valley");
    } else if (query.includes("ladakh")) {
      navigate("/trip/leh-ladakh");
    } else if (query.includes("goa")) {
      navigate("/state/goa");
    } else {
      alert("No trips found. Try Himachal, Kashmir or Spiti");
    }
  };

  /* 🔥 QUICK SELECT */
  const quickSearch = (place) => {
    setSearchQuery(place);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-6 bg-gray-50">

      <div className="relative w-full max-w-[1400px] mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[55vh] sm:h-[60vh] md:h-[75vh] lg:h-[80vh]">

        {/* 🎥 VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover animate-[zoom_20s_infinite_alternate]"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* 🎨 OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* CONTENT */}
        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center px-5 text-center">

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold italic text-white uppercase leading-tight tracking-wide drop-shadow-md">
            Pocket Friendly Trips
            <br />
            Unforgettable Memories
          </h1>

          {/* SUBTITLE */}
          <p className="text-white/80 text-xs sm:text-sm md:text-lg mt-4 mb-6 font-medium uppercase tracking-wider">
            Explore India Like Never Before
          </p>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="bg-white/80 backdrop-blur-xl p-1.5 rounded-full flex items-center shadow-2xl max-w-xl md:max-w-2xl w-full border border-white/40 focus-within:border-blue-500 transition-all"
          >
            <div className="pl-4 text-gray-500 hidden sm:block">
              <Search size={20} />
            </div>

            <input
              type="text"
              placeholder={`Search ${placeholder}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 text-gray-800 text-sm md:text-base outline-none bg-transparent font-medium"
            />

            <button
              type="submit"
              className="bg-[#1e52bc] hover:bg-black text-white px-4 md:px-7 py-2 rounded-full font-semibold uppercase text-xs md:text-sm transition-all shadow-lg active:scale-95"
            >
              Search
            </button>
          </form>

          {/* 🔥 TRENDING */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {["Kedarnath", "Manali", "kasol", "Kashmir"].map((item, i) => (
              <button
                key={i}
                onClick={() => quickSearch(item)}
                className="text-xs md:text-sm bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30 hover:bg-white hover:text-black transition"
              >
                {item}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 🔥 KEYFRAME (IMPORTANT) */}
      <style>
        {`
          @keyframes zoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
          }
        `}
      </style>

    </section>
  );
};

export default Hero;