import React from "react";

const Terms = () => {
  return (
    <main className="pt-[115px] bg-white">

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Terms & Conditions
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Please Read Before Booking Your Trip
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-gray-600 leading-relaxed">

          <p className="mb-6">
            By booking a trip with Ghoomo Saste Me, you agree to the following
            terms and conditions. Please read them carefully before making a booking.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Booking Policy
          </h2>
          <p className="mb-4">
            All bookings must be confirmed with a valid payment. Availability
            of seats depends on trip capacity. Your booking will be confirmed
            only after receiving the advance or full payment.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Traveler Responsibilities
          </h2>
          <p className="mb-4">
            Travelers must follow trip guidelines and instructions provided by
            the trip captain during the journey. Any misconduct or violation of
            rules may result in cancellation of the trip without refund.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Changes & Modifications
          </h2>
          <p className="mb-4">
            Ghoomo Saste Me reserves the right to modify itineraries due to
            weather conditions, safety concerns, or operational reasons.
            Any changes will be informed to travelers in advance whenever possible.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Cancellation & Refund Policy
          </h2>
          <p className="mb-4">
            Cancellation requests must be made in advance. Refunds will be processed
            based on the cancellation policy of the trip. Some bookings may be
            non-refundable depending on the hotel and transport policies.
          </p>

          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-2">
            Liability
          </h2>
          <p>
            Ghoomo Saste Me is not responsible for any loss, injury, delay, or
            damage caused due to natural disasters, accidents, or unforeseen
            circumstances during the trip.
          </p>

        </div>
      </section>

    </main>
  );
};

export default Terms;