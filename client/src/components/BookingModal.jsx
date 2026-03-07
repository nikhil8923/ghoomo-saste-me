import React, { useState } from 'react';
import { X, User, Phone, Mail, Calendar, Users, ShieldCheck, Send } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, tripTitle, selectedBatch, selectedPrice }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call / Form Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Auto-close after 3 seconds on success
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop Blur  */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose}></div>

      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors z-10">
          <X size={24} />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 italic">Confirm Your Slot</p>
              <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] uppercase italic leading-tight">
                {tripTitle}
              </h2>
            </div>

            {/* Trip Brief Info Box */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 mb-8 flex justify-between items-center">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Selected Batch</p>
                <p className="text-xs font-bold text-slate-700">{selectedBatch || "Not Selected"}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</p>
                <p className="text-xl font-black text-blue-600 italic">₹{selectedPrice}</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="text" placeholder="Full Name" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" />
              </div>

              {/* WhatsApp Number */}
              <div className="relative">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="tel" placeholder="WhatsApp Number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" />
              </div>

              {/* Email Address */}
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="email" placeholder="Email Address" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-5 text-sm font-bold outline-none focus:border-blue-600 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="mt-8">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black uppercase italic tracking-widest flex items-center justify-center gap-3 hover:bg-[#0f172a] transition-all shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Send Booking Query <Send size={18} /></>
                )}
              </button>
            </div>

            <p className="text-center text-[10px] font-bold text-slate-400 mt-6 uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-green-500" /> Secure SSL Encrypted Booking
            </p>
          </form>
        ) : (
          /* SUCCESS STATE  */
          <div className="p-12 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={40} />
            </div>
            <h3 className="text-2xl font-black text-[#0f172a] uppercase italic mb-2">Query Received!</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
              Our Trip Captain will reach out to you on WhatsApp within 30 minutes to confirm your seat.
            </p>
            <div className="bg-green-50 text-green-700 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">
              Adventure is calling!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;