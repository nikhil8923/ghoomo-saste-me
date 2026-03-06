import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, Clock, Bell } from 'lucide-react';
import { tripsData } from '../data/trips';

const StateTrips = () => {
  const { stateId } = useParams();

  // Scroll to top whenever the state changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stateId]);

  // Filter the database for trips matching the current state
  const stateTrips = tripsData.filter(trip => trip.stateId === stateId);

  // Helper function to format the display name of the state
  const formatStateName = (id) => {
    const names = {
      'himachal': 'Himachal Pradesh',
      'uttarakhand': 'Uttarakhand',
      'rajasthan': 'Rajasthan',
      'kashmir': 'Kashmir',
      'goa': 'Goa'
    };
    return names[id] || id.toUpperCase();
  };

  // WhatsApp Lead Generation Logic
  const handleNotifyMe = () => {
    const phoneNumber = "91"; // Your WhatsApp number
    const message = `Hi Ghoomo Saste Me! I'm interested in the upcoming trips for ${formatStateName(stateId)}. Please notify me when they are live!`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="pt-[115px] flex-grow bg-gray-50 pb-16 min-h-screen">
      
      {/* Dynamic State Header Banner */}
      <div className="bg-[#1a2b4c] py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="container mx-auto px-4 max-w-7xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-4 uppercase italic tracking-tighter">
            {formatStateName(stateId)}
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto font-medium">
            Explore our handpicked backpacking trips and weekend getaways in {formatStateName(stateId)}.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-12">
        <Link to="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-bold w-fit transition-colors group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Home
        </Link>

        {/* --- CONDITIONAL RENDERING --- */}
        {stateTrips.length === 0 ? (
          /* Professional "Coming Soon" State with WhatsApp Integration */
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-10 md:p-20 text-center shadow-xl border border-blue-50">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-8 text-blue-600 animate-bounce">
              <Clock size={40} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-[#1a2b4c] mb-6 uppercase italic tracking-tighter">
              {formatStateName(stateId)} Arriving Soon!
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl mb-10 leading-relaxed font-medium">
              Our team is currently on the ground in <span className="text-blue-600 font-bold">{formatStateName(stateId)}</span>, crafting the most pocket-friendly itineraries. Be the first to know when we launch!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="w-full sm:w-auto bg-[#1a2b4c] text-white px-10 py-4 rounded-full font-bold hover:bg-blue-800 transition-all shadow-lg">
                Explore Other States
              </Link>
              <button 
                onClick={handleNotifyMe}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#ffcc00] text-black px-10 py-4 rounded-full font-bold hover:bg-yellow-400 transition-all shadow-lg hover:shadow-yellow-100 active:scale-95"
              >
                <Bell size={18} /> Notify Me on WhatsApp
              </button>
            </div>
          </div>
        ) : (
          /* Active Trips Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stateTrips.map((trip) => (
              <div key={trip.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
                
                <div className="relative h-60 overflow-hidden">
                  <img src={trip.image} alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[11px] font-black text-[#1a2b4c] flex items-center gap-1.5 shadow-md uppercase tracking-wider">
                    <MapPin size={12} className="text-blue-600" /> {formatStateName(stateId)}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-3">
                    <Clock size={14} /> {trip.duration}
                  </div>
                  
                  <h3 className="text-xl font-black text-[#1a2b4c] mb-3 group-hover:text-blue-600 transition-colors">
                    {trip.title}
                  </h3>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <div>
                        <span className="text-[10px] text-gray-400 line-through font-bold">₹{trip.originalPrice}</span>
                        <div className="text-lg font-black text-gray-900 leading-none">₹{trip.price} <span className="text-[10px] text-gray-500 font-medium">/ person</span></div>
                    </div>
                    <Link to={`/trip/${trip.id}`} className="bg-[#ffcc00] hover:bg-black hover:text-white text-black px-5 py-2.5 rounded-xl font-extrabold text-sm transition-all shadow-sm">
                      Trip Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default StateTrips;