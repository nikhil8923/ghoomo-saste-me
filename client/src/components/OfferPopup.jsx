import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Gift } from 'lucide-react';

const OfferPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[9999] w-[170px] md:w-[250px] animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="animate-shake-infinite">
        <div className="relative bg-[#1e52bc]/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border-[2px] md:border-[3px] border-[#ffcc00]">
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 bg-black/40 hover:bg-black/60 text-[#ffcc00] p-1 rounded-full transition-colors z-20"
          >
            <X size={12} />
          </button>

          {/* Reduced vertical padding (p-3 md:p-4) to shrink height */}
          <div className="p-3 md:p-4 text-white">
            
            <div className="bg-[#ffcc00] text-[#1e52bc] inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-black text-[8px] md:text-[10px] uppercase mb-1.5 md:mb-2">
              <Gift size={10} className="fill-[#1e52bc]" />
              Limited Offer
            </div>
            
            {/* Reduced text size from 2xl to lg/xl to save vertical space */}
            <h3 className="text-[13px] md:text-lg font-black leading-none mb-1 md:mb-2 uppercase italic tracking-tighter">
              Upgrade Now!
            </h3>

            <div className="w-8 md:w-12 h-1 bg-[#ffcc00] mb-2 md:mb-3 rounded-full"></div>

            {/* Tightened line height and reduced bottom margin */}
            <p className="text-[10px] md:text-[12px] leading-tight font-bold mb-3 md:mb-4 text-white/95">
              Raised <span className="text-[#ffcc00]">54 Cr.</span> for India's travel space! Massive price-drop live.
            </p>

            {/* Slimmer button with less vertical padding (py-1.5 md:py-2.5) */}
            <button className="flex items-center justify-between w-full bg-[#ffcc00] text-[#1e52bc] hover:bg-black hover:text-[#ffcc00] transition-all group px-3 py-1.5 md:px-4 md:py-2.5 rounded-full font-black text-[10px] md:text-[15px] uppercase italic tracking-tighter">
              Unlock Savings
              <ExternalLink size={14} className="md:size-18 group-hover:translate-x-0.5 transition-transform" />
            </button>
            
            {/* Removed extra branding text at the bottom to keep height minimal */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;