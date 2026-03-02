import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { tripsData } from '../data/trips'; // <-- 1. Importing from your new central database!

const months = ['February 2026', 'March 2026', 'April 2026', 'May 2026', 'June 2026', 'July 2026'];

const UpcomingTrips = () => {
  const [activeMonth, setActiveMonth] = useState('February 2026');

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2b4c]">
            Upcoming Trips
          </h2>
          <a href="#view-more" className="text-blue-600 font-bold hover:underline hidden sm:block">
            View More →
          </a>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex overflow-x-auto gap-4 mb-8 pb-2 hide-scrollbar">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-sm transition-colors border-2 ${
                activeMonth === month 
                  ? 'bg-[#1a2b4c] text-white border-[#1a2b4c]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-500'
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Trips Grid - NOW MAPPED DIRECTLY FROM YOUR DATABASE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tripsData.map((trip) => (
            <div key={trip.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
              
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={trip.image} 
                  alt={trip.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-sm text-gray-500 font-semibold mb-2">
                  {trip.duration}
                </div>
                
                <h3 className="text-xl font-bold text-[#1a2b4c] mb-2 line-clamp-1">
                  {trip.title}
                </h3>
                
                {/* Short description preview */}
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">
                  {trip.description}
                </p>

                <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-auto">
                  <div>
                    <span className="text-xs text-gray-400 line-through block">₹{trip.originalPrice}</span>
                    <span className="text-lg font-extrabold text-gray-900">₹{trip.price} <span className="text-xs font-normal text-gray-500">per person</span></span>
                  </div>
                  
                  {/* 2. React Router Link instead of a dead button! */}
                  <Link 
                    to={`/trip/${trip.id}`} 
                    className="bg-[#ffcc00] hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                  >
                    Trip Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingTrips;