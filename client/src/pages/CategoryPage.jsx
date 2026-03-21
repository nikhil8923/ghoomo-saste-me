import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { tripsData } from '../data/trips';

const CategoryPage = () => {
  const { categoryId } = useParams(); // Gets 'backpacking' or 'adventure' from URL
  const displayTrips = tripsData.filter(trip => trip.category === categoryId);

  return (
    <div className="pt-40 pb-20 container mx-auto px-4 min-h-screen">
     <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-tight">
        {categoryId} <span className="text-blue-600">Exploration</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {displayTrips.map(trip => (
          <Link key={trip.id} to={`/trip/${trip.id}`} className="group rounded-[40px] overflow-hidden shadow-2xl bg-white block">
            <div className="h-64 overflow-hidden relative">
              <img src={trip.image || trip.gallery[0].src} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
              <div className="absolute top-4 right-4 bg-yellow-400 px-4 py-1 rounded-full font-black italic text-sm">₹{trip.price}</div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-black uppercase text-[#1a2b4c]">{trip.title}</h3>
              <p className="text-blue-600 font-bold mt-2">{trip.duration} Batch 2026</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;