import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Clock, ArrowLeft, ChevronDown, Plus, X, 
  ChevronLeft, ChevronRight, Camera, Calendar, 
  Hotel, Utensils, Bus, ShieldCheck, MessageCircle, Star, 
  MessageSquareQuote, ClipboardList 
} from 'lucide-react';
import { tripsData } from '../data/trips'; 
import BookingModal from '../components/BookingModal';

const TripDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [selectedSharing, setSelectedSharing] = useState('quad');
  
  // LIGHTBOX STATE
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const foundTrip = tripsData.find((t) => t && t.id === id);
    setCurrentTrip(foundTrip);
    window.scrollTo(0, 0);
  }, [id]);

  if (!currentTrip) return null;

  const currentPrice = currentTrip.occupancy ? currentTrip.occupancy[selectedSharing] : currentTrip.price;

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <main className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-slate-900 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* 1. HERO GALLERY GRID - Fixed Height & Headroom Fix */}
        <div className="grid grid-cols-4 gap-3 h-[300px] md:h-[500px] mb-12 rounded-[40px] overflow-hidden shadow-xl border-4 border-white bg-slate-100">
          
          {/* Main Photo: object-top ensures faces aren't cut off */}
          <div className="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden group cursor-pointer" onClick={() => openLightbox(0)}>
            <img 
              src={currentTrip.image} 
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" 
              alt="Main" 
              onError={(e) => { e.target.src = "https://placehold.co/800x600?text=Image+Not+Found"; }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="text-white" size={32} />
            </div>
          </div>

          {/* Slots 2 & 3 */}
          {currentTrip.gallery?.slice(0, 2).map((img, i) => (
            <div key={i} className="hidden md:block relative overflow-hidden group cursor-pointer" onClick={() => openLightbox(i + 1)}>
              <img src={img.src} className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700" alt="Gallery" />
            </div>
          ))}

          {/* Slot 4: THE "VIEW ALL" TRIGGER */}
          {currentTrip.gallery?.[2] && (
            <div className="hidden md:block relative overflow-hidden group">
              <img src={currentTrip.gallery[2].src} className="w-full h-full object-cover" alt="More" />
              <button 
                onClick={() => setIsLightboxOpen(true)}
                className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white backdrop-blur-[2px] hover:bg-black/40 transition-all"
              >
                <Plus size={30} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-widest mt-2">View All Photos</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* LEFT COLUMN: ITINERARY & REVIEWS */}
          <div className="lg:col-span-2 space-y-10">
            <h1 className="text-4xl md:text-7xl font-black text-[#0f172a] uppercase italic leading-[0.85] tracking-tighter mb-6">
              {currentTrip.title}
            </h1>

            {/* ITINERARY */}
            <div className="bg-white p-8 md:p-14 rounded-[50px] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black uppercase italic mb-12 flex items-center gap-4 border-b border-slate-50 pb-8">
                <Calendar size={28} className="text-blue-600" /> Full Plan
              </h3>
              <div className="relative before:content-[''] before:absolute before:left-[27px] before:top-6 before:bottom-6 before:w-0.5 before:bg-slate-100">
                {currentTrip.itinerary?.map((day, i) => (
                  <div key={i} className="relative pl-20 pb-16 group last:pb-0">
                    <div className={`absolute left-0 top-1 w-14 h-14 rounded-full flex items-center justify-center z-10 shadow-xl ${day.day === 0 ? 'bg-blue-600 text-white' : 'bg-white border-2 border-blue-600 text-blue-600'}`}>
                      <span className="font-black text-sm italic">D{day.day}</span>
                    </div>
                    <div className="bg-slate-50/40 p-8 rounded-[40px] border border-transparent hover:border-blue-100 hover:bg-white transition-all shadow-sm">
                      <h4 className="text-2xl font-black uppercase italic mb-4">{day.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-[2]">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REVIEWS */}
            <div className="bg-white p-8 md:p-14 rounded-[50px] shadow-sm border border-slate-100">
              <h3 className="text-2xl font-black uppercase italic mb-12 flex items-center gap-4 border-b border-slate-50 pb-8">
                <MessageSquareQuote size={28} className="text-blue-600" /> Traveler Stories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentTrip.reviews?.map((r, i) => (
                  <div key={i} className="bg-slate-50/50 p-8 rounded-[40px] border border-slate-100">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={r.image} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md" alt="User" />
                      <div>
                        <p className="text-sm font-black uppercase italic tracking-tight">{r.name}</p>
                        <div className="flex text-yellow-500"><Star size={12} fill="currentColor"/></div>
                      </div>
                    </div>
                    <p className="text-slate-500 text-xs italic leading-relaxed bg-white p-5 rounded-3xl border border-slate-50">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR (RESORED OPTIONS) */}
          <div className="lg:sticky lg:top-28 space-y-6">
            
            {/* BOOKING CARD */}
            <div className="bg-[#0f172a] text-white p-12 rounded-[60px] shadow-2xl relative overflow-hidden">
              <div className="mb-8">
                <label className="text-[10px] font-black uppercase text-blue-400 mb-4 block italic">Occupancy</label>
                <div className="grid grid-cols-3 gap-2 bg-white/5 p-1.5 rounded-2xl">
                  {['quad', 'triple', 'double'].map((type) => (
                    <button 
                        key={type} 
                        onClick={() => setSelectedSharing(type)} 
                        className={`py-3.5 rounded-xl text-[10px] font-black uppercase transition-all ${selectedSharing === type ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}
                    >
                        {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-7xl font-black italic tracking-tighter mb-10">₹{currentPrice}</div>
              
              <button onClick={() => setIsModalOpen(true)} className="w-full bg-blue-600 py-7 rounded-[35px] font-black uppercase italic tracking-widest hover:bg-white hover:text-[#0f172a] transition-all active:scale-95 shadow-xl">
                Book Adventure
              </button>
            </div>

            {/* RESTORED: WHATSAPP CONTACT CARD */}
            <a 
              href={`https://wa.me/917827372844?text=Hi, I'm interested in the ${currentTrip.title} package.`}
              className="bg-white p-8 rounded-[45px] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Talk to Captain</p>
                  <p className="text-sm font-bold text-slate-900">+91 7827372844</p>
                </div>
              </div>
              <ChevronDown className="-rotate-90 text-slate-300 group-hover:text-blue-600 transition-colors" size={20} />
            </a>

            {/* RESTORED: DOWNLOAD PDF ACTION */}
            <a 
              href={`/${currentTrip.id}.pdf`} 
              download 
              className="block bg-slate-900/5 border border-dashed border-slate-300 p-8 rounded-[45px] group hover:bg-white hover:border-blue-600 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm transition-colors">
                    <ClipboardList size={22} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Offline Access</p>
                    <p className="text-sm font-bold text-slate-900">Get Itinerary PDF</p>
                  </div>
                </div>
                <ArrowLeft className="rotate-[225deg] text-slate-300 group-hover:text-blue-600 transition-colors" size={16} />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 4. LIGHTBOX MODAL - Uses object-contain to show full image */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-[999] flex items-center justify-center p-6 backdrop-blur-sm">
          <button onClick={() => setIsLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-4 rounded-full">
            <X size={24} />
          </button>
          
          <button onClick={() => setLightboxIndex((p) => (p === 0 ? currentTrip.gallery.length - 1 : p - 1))} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 bg-white/10 p-5 rounded-full"><ChevronLeft size={24}/></button>
          <button onClick={() => setLightboxIndex((p) => (p === currentTrip.gallery.length - 1 ? 0 : p + 1))} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 bg-white/10 p-5 rounded-full"><ChevronRight size={24}/></button>

          <img 
            src={currentTrip.gallery?.[lightboxIndex]?.src || currentTrip.image} 
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" 
            alt="Gallery Full View" 
          />
        </div>
      )}

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tripTitle={currentTrip.title} 
        selectedPrice={currentPrice} 
      />
    </main>
  );
};

export default TripDetails;