import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { MapPin, CheckCircle, ArrowLeft, Clock } from 'lucide-react';
import { tripsData } from '../data/trips'; 

const TripDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);

  useEffect(() => {
    // This looks for the ID (like 'rishikesh-mussoorie') inside your trips.js file
    const foundTrip = tripsData.find((trip) => trip.id === id);
    setCurrentTrip(foundTrip);
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentTrip) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-black text-red-600 uppercase italic">Trip Not Found</h2>
        <Link to="/" className="text-blue-600 underline font-bold">RETURN HOME</Link>
      </div>
    );
  }

  return (
    <main className="pt-[80px] pb-20 bg-white min-h-screen">
      {/* HEADER LOGO SECTION */}
      <div className="bg-white border-b py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-black italic text-[#1a2b4c]">
            GHOOMO <span className="text-blue-600">SASTE ME</span>
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#1a2b4c] text-white px-5 py-2 rounded-full font-black text-[10px] tracking-widest">
            BOOK NOW
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-8">
        <Link to="/" className="flex items-center gap-2 text-gray-400 font-bold mb-6 hover:text-blue-600">
          <ArrowLeft size={16} /> BACK TO EXPLORE
        </Link>

        <h1 className="text-4xl md:text-7xl font-black text-[#1a2b4c] uppercase italic mb-4">
          {currentTrip.title}
        </h1>
        
        <div className="flex gap-6 text-blue-600 font-black uppercase italic text-sm mb-12">
          <div className="flex items-center gap-2"><MapPin size={20} /> {currentTrip.location}</div>
          <div className="flex items-center gap-2 text-gray-500"><Clock size={20} /> {currentTrip.duration}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* ITINERARY COLUMN */}
          <div className="lg:col-span-2 space-y-16">
            <h3 className="text-3xl font-black uppercase italic text-[#1a2b4c] border-b-8 border-yellow-400 w-fit pb-1">The Itinerary</h3>
            <div className="space-y-12">
              {currentTrip.itinerary?.map((day, i) => (
                <div key={i} className="group">
                  <div className="relative h-64 md:h-96 rounded-[40px] overflow-hidden mb-6 shadow-2xl">
                    <img src={day.image} alt={day.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-6 left-6 bg-yellow-400 text-[#1a2b4c] px-5 py-2 rounded-2xl font-black italic">Day {day.day}</div>
                  </div>
                  <h4 className="text-2xl font-black text-[#1a2b4c] uppercase italic mb-4">{day.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed bg-gray-50 p-8 rounded-[32px] shadow-sm">
                    {day.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="h-fit lg:sticky lg:top-[160px]">
            <div className="bg-[#1a2b4c] text-white p-10 rounded-[40px] shadow-2xl">
              <div className="text-6xl font-black italic mb-8">₹{currentTrip.price}</div>
              <div className="space-y-4 mb-10">
                <h5 className="font-black uppercase italic text-yellow-400 border-b border-white/10 pb-2">Inclusions</h5>
                {currentTrip.inclusions?.map((inc, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-90">
                    <CheckCircle size={18} className="text-yellow-400 shrink-0" /> {inc}
                  </div>
                ))}
              </div>
              <button onClick={() => setIsModalOpen(true)} className="w-full bg-yellow-400 text-[#1a2b4c] py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white transition-all shadow-xl">
                Book This Trek
              </button>
            </div>
          </div>
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tripTitle={currentTrip.title} />
    </main>
  );
};

export default TripDetails;