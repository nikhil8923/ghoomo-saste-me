import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    // We use a relative container with a minimum height to ensure it looks great on all devices
    <section className="relative w-full h-[75vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        src="https://cdn.pixabay.com/video/2020/05/24/40061-424888849_large.mp4" 
      ></video>

      {/* Dark Overlay so the text and search bar stand out clearly */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center mt-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 drop-shadow-lg leading-tight">
          Pocket friendly trips, <br className="hidden md:block" /> unforgettable memories {/* [cite: 19] */}
        </h1>

        {/* Search Bar - Responsive and perfectly centered */}
        <div className="bg-white p-2 rounded-full flex items-center shadow-2xl max-w-2xl mx-auto transition-transform hover:scale-[1.02]">
          <div className="pl-4 text-gray-500 hidden sm:block">
            <Search size={24} />
          </div>
          <input
            type="text"
            placeholder="Where do you want to go?" 
            className="w-full px-4 py-3 text-gray-800 text-[15px] md:text-lg outline-none bg-transparent rounded-full"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-3 rounded-full font-bold transition duration-300">
            Search
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;