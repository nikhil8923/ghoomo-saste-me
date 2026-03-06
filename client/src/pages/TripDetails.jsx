import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookingModal from '../components/BookingModal';
import { MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import { tripsData } from '../data/trips'; 

// Hardcoded data for Kedarkantha to prevent "undefined" crashes
const KEDARKANTHA_DATA = {
  id: "kedarkantha",
  title: "Kedarkantha Snow Trek",
  price: "5000", //
  location: "Sankri, Uttarakhand",
  duration: "5 Days / 4 Nights", //
  image: "https://images.unsplash.com/photo-1591122948563-54832527845f",
  itinerary: [
    { day: 1, title: "Dehradun to Sankri (Drive)", desc: "A scenic 7-8 hour drive passing through Mussoorie and Kempty Falls to reach the base camp.", image: "https://images.unsplash.com/photo-1591122948563-54832527845f" },
    { day: 2, title: "Sankri to Juda-ka-Talab", desc: "A 4-5 hour trek through dense oak and pine forests to a serene lake campsite.", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23" },
    { day: 3, title: "Juda-ka-Talab to Base Camp", desc: "Trek to 10,600 ft with panoramic views of snow-capped Himalayan ranges.", image: "https://images.unsplash.com/photo-1589779267444-60efd3200729" },
    { day: 4, title: "Summit & Descend to Hargaon", desc: "Summit climb for breathtaking views followed by a descent to Hargaon/Juda-ka-Talab.", image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b" },
    { day: 5, title: "Sankri to Dehradun (Drive)", desc: "Final drive back to Dehradun marking the end of your memorable journey.", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" }
  ],
  inclusions: [
    "Dehradun to Dehradun Transport",
    "Stay: Homestay & Tents (Shared)",
    "Meals: 4-time daily meals",
    "Forest Permits & Camping Charges",
    "Crampons & Gaiters",
    "Expert Guide & Team Captain"
  ]
};

const TripDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // If the ID is 'kedarkantha', we use the hardcoded data to guarantee it loads
  const currentTrip = id === "kedarkantha" ? KEDARKANTHA_DATA : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentTrip) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h2 className="text-2xl font-black text-red-600 uppercase italic">Trip Data Error</h2>
        <p className="text-gray-500 font-bold mb-4">Could not find trip: "{id}"</p>
        <Link to="/" className="text-blue-600 underline font-bold">RETURN HOME</Link>
      </div>
    );
  }

  return (
    <main className="pt-[80px] pb-20 bg-white min-h-screen">
      {/* BRANDING HEADER WITH LOGO */}
      <div className="bg-white border-b py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/">
            {/* Replace with your actual logo path */}
            <h2 className="text-xl font-black italic tracking-tighter text-[#1a2b4c]">GHOOMO <span className="text-blue-600">SASTE ME</span></h2>
          </Link>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#1a2b4c] text-white px-5 py-2 rounded-full font-black uppercase italic text-[10px] tracking-widest">
            BOOK NOW
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl mt-8">
        <Link to="/" className="flex items-center gap-2 text-gray-400 font-bold mb-6 hover:text-blue-600 transition-colors">
          <ArrowLeft size={16} /> BACK TO EXPLORE
        </Link>

        <h1 className="text-4xl md:text-7xl font-black text-[#1a2b4c] uppercase italic tracking-tighter mb-4">
          {currentTrip.title}
        </h1>
        <div className="flex items-center gap-2 text-blue-600 font-black uppercase italic tracking-widest text-sm mb-12">
          <MapPin size={20} /> {currentTrip.location}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* VISUAL ITINERARY COLUMN */}
          <div className="lg:col-span-2 space-y-16">
            <h3 className="text-3xl font-black uppercase italic text-[#1a2b4c] border-b-8 border-blue-600 w-fit pb-1">Detailed Itinerary</h3>
            
            <div className="space-y-12">
              {currentTrip.itinerary.map((day, i) => (
                <div key={i} className="group">
                  <div className="relative h-64 md:h-96 rounded-[40px] overflow-hidden mb-6 shadow-2xl">
                    <img src={day.image} alt={day.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-6 left-6 bg-white px-5 py-2 rounded-2xl font-black italic uppercase text-[#1a2b4c] shadow-lg">Day {day.day}</div>
                  </div>
                  <h4 className="text-2xl font-black text-[#1a2b4c] uppercase italic mb-4">{day.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed bg-gray-50 p-8 rounded-[32px] border border-transparent group-hover:border-blue-100 group-hover:bg-white transition-all shadow-sm">
                    {day.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* BOOKING SIDEBAR */}
          <div className="h-fit lg:sticky lg:top-[160px]">
            <div className="bg-[#1a2b4c] text-white p-10 rounded-[40px] shadow-2xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2 italic">Special Student Price</p>
              <div className="text-6xl font-black italic mb-8">₹{currentTrip.price}</div>
              
              <div className="space-y-4 mb-10">
                <h5 className="font-black uppercase italic text-blue-400 tracking-tighter">Inclusions</h5>
                {currentTrip.inclusions.map((inc, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-90">
                    <CheckCircle size={18} className="text-blue-400 shrink-0" /> {inc}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white text-[#1a2b4c] py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-yellow-400 transition-all shadow-xl active:scale-95"
              >
                Book This Trek
              </button>
              <p className="text-center text-[10px] font-bold mt-4 opacity-50 uppercase tracking-widest italic">Reserve Seat (₹1000 Advance)</p>
            </div>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tripTitle={currentTrip.title} />
    </main>
  );
};

export default TripDetails;