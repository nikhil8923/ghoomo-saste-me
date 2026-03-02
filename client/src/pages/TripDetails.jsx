import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, CheckCircle2, XCircle, Star, ArrowLeft } from 'lucide-react';
import { tripsData } from '../data/trips';

const TripDetails = () => {
  const { id } = useParams();
  
  // 1. Here is the state that controls the popup!
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // 2. This fixes the issue where it opened at the footer!
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const trip = tripsData.find(t => t.id === id);

  if (!trip) {
    return (
      <main className="pt-[140px] flex-grow container mx-auto text-center min-h-[60vh]">
        <h1 className="text-3xl font-bold text-red-500">Trip not found!</h1>
        <Link to="/" className="text-blue-600 underline mt-4 inline-block">Go back home</Link>
      </main>
    );
  }

  return (
    <main className="pt-[115px] flex-grow bg-gray-50 pb-16 relative">
      
      {/* Hero Image */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto max-w-6xl">
          <Link to="/" className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm font-bold w-fit">
             <ArrowLeft size={16} /> Back to Trips
          </Link>
          <div className="flex items-center gap-2 text-yellow-400 mb-2 font-bold text-sm">
            <MapPin size={16} /> {trip.location}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg mb-2">
            {trip.title}
          </h1>
          <div className="flex items-center gap-4 text-white font-medium">
            <span className="flex items-center gap-1"><Clock size={16}/> {trip.duration}</span>
            <span className="flex items-center gap-1 text-yellow-400"><Star size={16} fill="currentColor"/> {trip.rating} ({trip.reviews} Reviews)</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Itinerary) */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-4">About This Trip</h2>
              <p className="text-gray-600 leading-relaxed">{trip.description}</p>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-green-600 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} /> What's Included
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  {trip.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 bg-green-500 rounded-full"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
                  <XCircle size={20} /> What's Excluded
                </h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  {trip.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="mt-1 min-w-[6px] h-1.5 bg-red-400 rounded-full"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#1a2b4c] mb-6">Itinerary</h2>
              <div className="space-y-6 border-l-2 border-blue-100 ml-3 pl-6 relative">
                {trip.itinerary.map((dayPlan, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[35px] bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
                      {dayPlan.day}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{dayPlan.title}</h3>
                    <p className="text-gray-600 text-sm mt-2">{dayPlan.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Sticky Booking Card) */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky top-36 z-10">
              <div className="text-gray-400 text-sm font-semibold mb-1 line-through">₹{trip.originalPrice}</div>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-black text-[#1a2b4c]">₹{trip.price}</span>
                <span className="text-gray-500 font-medium pb-1">/ person</span>
              </div>
              <div className="border border-gray-200 rounded-xl p-3 mb-6 flex items-center gap-3 cursor-pointer hover:border-blue-500 transition">
                <Calendar className="text-blue-600" />
                <div>
                  <div className="text-xs text-gray-500 font-bold uppercase">Select Date</div>
                  <div className="text-sm font-semibold text-gray-800">View available batches</div>
                </div>
              </div>
              
              {/* 3. The updated button is right here! */}
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg shadow-blue-200"
              >
                Book Now
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* --- 4. THE BOOKING MODAL POP-UP --- */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            
            <button 
              onClick={() => setIsBookingOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors z-10"
            >
              <XCircle size={28} />
            </button>

            <div className="bg-[#1a2b4c] p-6 text-white pt-10">
              <h3 className="text-2xl font-bold mb-1">Book Your Trip</h3>
              <p className="text-blue-200 text-sm">{trip.title}</p>
            </div>

            <div className="p-6">
              <form className="space-y-4" onSubmit={(e) => { 
                e.preventDefault(); 
                alert('Booking Request Sent! We will contact you shortly.'); 
                setIsBookingOpen(false); 
              }}>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input type="text" required placeholder="Nikhil Chaudhary" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number (WhatsApp)</label>
                  <input type="tel" required placeholder="+91 00000 00000" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Travel Date</label>
                    <input type="date" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Total Travelers</label>
                    <input type="number" min="1" required defaultValue="1" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" className="w-full bg-[#ffcc00] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl text-lg transition-colors shadow-md">
                    Submit Request
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    No payment required right now. Our team will contact you to confirm batch availability.
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}
    </main>
  );
};

export default TripDetails;