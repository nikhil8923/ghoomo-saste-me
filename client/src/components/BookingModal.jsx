import React from 'react';
import { X, Send, MessageCircle } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, tripTitle }) => {
  if (!isOpen) return null;

  const handleWhatsAppInquiry = () => {
    const message = `Hi Ghoomo Saste Me! I'm interested in the ${tripTitle} trip. Can you share more details?`;
    window.open(`https://wa.me/919090403075?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1a2b4c]/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors">
          <X size={24} />
        </button>

        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-black text-[#1a2b4c] uppercase italic tracking-tighter mb-2">
            Book Your Spot
          </h2>
          <p className="text-blue-600 font-bold text-sm uppercase mb-8">Trip: {tripTitle}</p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input type="text" placeholder="Your Name" className="w-full bg-gray-100 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
            </div>
            <div>
              <input type="tel" placeholder="Phone Number" className="w-full bg-gray-100 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 outline-none font-bold" />
            </div>
            
            <button className="w-full bg-[#1a2b4c] text-white py-4 rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg mt-6">
              Confirm Interest <Send size={18} />
            </button>

            <div className="relative py-4 flex items-center">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 font-bold text-xs uppercase">Or chat with us</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <button 
              onClick={handleWhatsAppInquiry}
              className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg"
            >
              WhatsApp Inquiry <MessageCircle size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;