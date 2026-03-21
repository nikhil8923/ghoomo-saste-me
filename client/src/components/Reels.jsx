import React from "react";
import { Play } from "lucide-react";

const reelsData = [
  {
    id: 1,
    title: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    link: "/category/adventure",
  },
  {
    id: 2,
    title: "Corporate Offsite",
    image:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    link: "/category/corporate",
  },
  {
    id: 3,
    title: "Spiti Valley",
    image:
      "https://images.unsplash.com/photo-1594056285491-1fa14f6b0b53?auto=format&fit=crop&w=800&q=80",
    link: "/trip/spiti",
  },
  {
    id: 4,
    title: "Manali Snow",
    image:
      "https://images.unsplash.com/photo-1605649487212-4d43bf8a77cd?auto=format&fit=crop&w=800&q=80",
    link: "/state/himachal",
  },
];

const Reels = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#1a2b4c] mb-2">
            Fuel Your Wanderlust
          </h2>

          <p className="text-gray-600 text-sm md:text-base">
            Ever growing travel community of 200K+ Explorers!
          </p>
        </div>

        {/* Carousel */}
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x no-scrollbar">

          {reelsData.map((reel) => (
            <a
              key={reel.id}
              href={reel.link}
              className="relative min-w-[240px] md:min-w-[300px] h-[200px] md:h-[320px] rounded-xl overflow-hidden group snap-start shadow-md hover:shadow-xl transition-all"
            >
              {/* Image */}
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Play Icon */}
              <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md p-2 rounded-full">
                <Play size={18} className="text-white fill-white"/>
              </div>

              {/* Text */}
              <div className="absolute bottom-0 left-0 w-full p-3">
                <h3 className="text-white text-lg md:text-xl font-bold">
                  {reel.title}
                </h3>

                {reel.subtitle && (
                  <p className="text-yellow-400 text-xs md:text-sm font-semibold mt-1">
                    {reel.subtitle}
                  </p>
                )}
              </div>

            </a>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Reels;