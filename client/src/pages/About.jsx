import React from 'react';
import { Target, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <main className="pt-[115px] bg-white">
      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Our Story
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Jahaan Dil Chahe, Ghoomo Saste Me
          </p>
        </div>
      </section>

      {/* --- MISSION SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-[#1a2b4c] mb-8 uppercase tracking-tighter">
                Pocket Friendly Trips, <br /> Unforgettable Memories
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                At Ghoomo Saste Me, we believe that travel is not just about destinations, it’s about experiences, memories, and stories. Our mission is to make travel affordable, accessible, and unforgettable for everyone. We help travelers plan budget-friendly trips without compromising on experiences.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                We are not just a travel service provider, we are your travel partners. Whether it’s a weekend trip, a solo trip, a honeymoon, or a family vacation, we plan everything in a way that your trip is well-organized, affordable, and memorable. Our goal is simple — help more people travel more places while spending less money.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-8 rounded-3xl text-center">
                <Target className="mx-auto text-blue-600 mb-4" size={40} />
                <h4 className="font-black text-[#1a2b4c] uppercase">Our Goal</h4>
                <p className="text-sm text-gray-500">Make Travel Affordable For Everyone</p>
              </div>
              <div className="bg-yellow-50 p-8 rounded-3xl text-center mt-8">
                <Heart className="mx-auto text-yellow-500 mb-4" size={40} />
                <h4 className="font-black text-[#1a2b4c] uppercase">Our Promise</h4>
                <p className="text-sm text-gray-500">Affordable Trips, Best Experiences</p>
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
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">5 Cr+</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Value Created</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">30+</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Destinations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Google Rating</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">8k+</div>
              <div className="text-gray-500 font-bold uppercase text-xs tracking-widest">Community Size</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHAT WE DO SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b4c] mb-6 uppercase tracking-tighter">
            What We Do
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            At Ghoomo Saste Me, we help travelers plan affordable and well-organized trips.
            We provide customized travel itineraries, hotel bookings, transport arrangements,
            and complete travel planning so you can enjoy your trip without any stress.
            Whether it's a solo trip, a couple trip, a family vacation, or a group tour,
            we make sure your trip is memorable, affordable, and perfectly planned.
          </p>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-5xl font-black text-center text-[#1a2b4c] mb-16 uppercase tracking-tighter">
            Why Choose Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="font-black text-xl text-[#1a2b4c] mb-3">Affordable Packages</h4>
              <p className="text-gray-600">
                We provide budget-friendly travel packages so that everyone can travel
                without worrying about high costs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="font-black text-xl text-[#1a2b4c] mb-3">Customized Itineraries</h4>
              <p className="text-gray-600">
                Every traveler is different, so we create personalized travel plans
                based on your interests, budget, and travel style.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm">
              <h4 className="font-black text-xl text-[#1a2b4c] mb-3">24/7 Support</h4>
              <p className="text-gray-600">
                Our team is always available to help you before, during, and after your trip
                to make your travel experience smooth and stress-free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1a2b4c] mb-16 uppercase tracking-tighter">
            Our Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6">
              <h4 className="font-black text-lg text-[#1a2b4c] mb-2">Trip Planning</h4>
              <p className="text-gray-600 text-sm">Complete travel planning based on your budget and preferences.</p>
            </div>

            <div className="p-6">
              <h4 className="font-black text-lg text-[#1a2b4c] mb-2">Hotel Booking</h4>
              <p className="text-gray-600 text-sm">Affordable and comfortable hotel bookings.</p>
            </div>

            <div className="p-6">
              <h4 className="font-black text-lg text-[#1a2b4c] mb-2">Transport</h4>
              <p className="text-gray-600 text-sm">Travel and transport arrangements for your trip.</p>
            </div>

            <div className="p-6">
              <h4 className="font-black text-lg text-[#1a2b4c] mb-2">Custom Packages</h4>
              <p className="text-gray-600 text-sm">Group tours, honeymoon packages, and customized trips.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
          Plan Your Trip With Us
        </h2>
        <p className="text-blue-200 mb-8 text-lg">
          Travel More, Spend Less, and Create Unforgettable Memories With Ghoomo Saste Me.
        </p>
        <button
          onClick={() => window.open("https://wa.me/917827372844", "_blank")}
          className="bg-white text-[#1a2b4c] font-bold px-8 py-3 rounded-full"
        >
          Plan My Trip
        </button>
      </section>
    </main>
  );
};

export default About;