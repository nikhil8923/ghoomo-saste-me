// src/components/ImageGallery.jsx
import React from 'react';
import PhotoAlbum from "react-photo-album";
import { Camera } from 'lucide-react';
import { realTripGallery } from '../data/trips'; // Import data from your data file

const ImageGallery = () => {
  return (
    <section className="py-24 bg-[#0f172a] rounded-[60px] my-16 shadow-2xl relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[150px] rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* BRANDED HEADER */}
        <div className="text-center mb-16">
          <span className="bg-blue-600/10 text-blue-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-4 inline-flex items-center gap-2.5 italic">
            <Camera size={14} strokeWidth={3} /> Real Moments, Real Trips
          </span>
          <h2 className="font-branding text-5xl md:text-7xl font-black text-white uppercase italic leading-[0.9] tracking-tighter mb-4">
            Our Community Gallery
          </h2>
          <p className="text-slate-400 font-medium text-lg max-w-xl mx-auto">
            Experience the magic of Ghoomo Saste Me adventures through the lens of fellow travelers.
          </p>
        </div>

        {/* THE MASONRY ALBUM */}
        <div className="bg-white/5 p-4 md:p-8 rounded-[40px] border border-white/10 backdrop-blur-sm">
          <PhotoAlbum 
            layout="masonry" // Crucial for the uneven grid look
            photos={realTripGallery} 
            spacing={16} // Gap between images
            
            // Defines how many columns to show on different screen sizes
            columns={(containerWidth) => {
              if (containerWidth < 640) return 2; // Mobile
              if (containerWidth < 1024) return 3; // Tablet
              return 4; // Desktop
            }}

            // Adds professional styling to the images
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
              <div style={wrapperStyle} className="group overflow-hidden rounded-3xl relative">
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                  <span className="text-white font-black text-xs uppercase tracking-widest bg-blue-600 px-4 py-2 rounded-full italic">Ghoomo Saste Me</span>
                </div>
                {renderDefaultPhoto({ 
                  className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                })}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;