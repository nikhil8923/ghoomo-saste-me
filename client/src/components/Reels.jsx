import React from 'react';
import { Play } from 'lucide-react';

const reelsData = [
  {
    id: 1,
    title: 'Vietnam',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&h=700&q=80',
  },
  {
    id: 2,
    title: 'Corporate Offsite',
    subtitle: 'by Go4Explore',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=400&h=700&q=80',
  },
  {
    id: 3,
    title: 'Spiti Valley',
    image: 'https://images.unsplash.com/photo-1594056285491-1fa14f6b0b53?auto=format&fit=crop&w=400&h=700&q=80',
  },
  {
    id: 4,
    title: 'Manali Snow',
    image: 'https://images.unsplash.com/photo-1605649487212-4d43bf8a77cd?auto=format&fit=crop&w=400&h=700&q=80',
  }
];

const Reels = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a2b4c] mb-3">
            Fuel Your Wanderlust
          </h2>
          <p className="text-gray-600 font-medium text-lg">
            Ever growing travel community of 200K+ Explorers!
          </p>
        </div>

        {/* Reels Carousel/Grid */}
        {/* We use overflow-x-auto to allow scrolling on mobile, while keeping a grid on desktop */}
        <div className="flex overflow-x-auto pb-8 gap-6 hide-scrollbar snap-x">
          {reelsData.map((reel) => (
            <div 
              key={reel.id} 
              className="relative flex-none w-64 md:w-72 h-[400px] md:h-[450px] rounded-2xl overflow-hidden group cursor-pointer shadow-lg snap-center"
            >
              {/* Background Image (The Reel) */}
              <img 
                src={reel.image} 
                alt={reel.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Play Icon (Top Right) */}
              <div className="absolute top-4 right-4 bg-black/40 p-2 rounded-full backdrop-blur-sm">
                <Play size={16} className="text-white fill-white" />
              </div>

              {/* Text Content (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-6 transition-transform duration-300 group-hover:-translate-y-2">
                <h3 className="text-white font-extrabold text-2xl tracking-wide drop-shadow-md">
                  {reel.title}
                </h3>
                {reel.subtitle && (
                  <p className="text-yellow-400 font-bold text-sm drop-shadow-md mt-1">
                    {reel.subtitle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reels;