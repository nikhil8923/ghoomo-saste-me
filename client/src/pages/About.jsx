import React from 'react';
import { Target, Heart, Users, Map } from 'lucide-react';

const About = () => {
  return (
    <main className="pt-[115px] bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Our Story
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Redefining Budget Travel in India
          </p>
        </div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-[#1a2b4c] mb-8 uppercase italic tracking-tighter">
                Pocket Friendly Trips, <br /> Unforgettable Memories
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded with a simple idea: **Travel shouldn't be a luxury.** We realized that most premium experiences in India were overpriced, leaving students and young professionals behind.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                At **Ghoomo Saste Me**, we bridge that gap. We curate high-quality backpacking trips, weekend getaways, and corporate tours that fit your pocket without compromising on the vibe.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-8 rounded-3xl text-center">
                <Target className="mx-auto text-blue-600 mb-4" size={40} />
                <h4 className="font-black text-[#1a2b4c] uppercase italic">Our Goal</h4>
                <p className="text-sm text-gray-500">10k+ Happy Travelers by 2026</p>
              </div>
              <div className="bg-yellow-50 p-8 rounded-3xl text-center mt-8">
                <Heart className="mx-auto text-yellow-500 mb-4" size={40} />
                <h4 className="font-black text-[#1a2b4c] uppercase italic">Our Heart</h4>
                <p className="text-sm text-gray-500">Community & Safety First</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 italic">54 Cr+</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Value Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 italic">50+</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Destinations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 italic">4.9/5</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Google Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2 italic">14k+</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Community Size</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;