import React from "react";

const RefundPolicy = () => {
  return (
    <main className="pt-[115px] bg-white">

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Cancellation & Refund
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Cancellation & Refund Policy
          </p>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 text-gray-600 leading-relaxed">

          <p className="mb-6">
            At Ghoomo Saste Me, we understand that plans may change. 
            Our cancellation and refund policy ensures fairness for both travelers and organizers.
          </p>

          {/* Cancellation Policy */}
          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-6 mb-3">
            Trip Cancellation by Traveler
          </h2>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>30 days or more before departure – 90% refund.</li>
            <li>15–29 days before departure – 50% refund.</li>
            <li>7–14 days before departure – 25% refund.</li>
            <li>Less than 7 days before departure – No refund.</li>
          </ul>

          {/* Organizer Cancellation */}
          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-8 mb-3">
            Trip Cancellation by Organizer
          </h2>

          <p className="mb-4">
            If Ghoomo Saste Me cancels a trip due to operational issues,
            weather conditions, or insufficient bookings, travelers will
            receive either:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Full refund of the booking amount</li>
            <li>Option to reschedule for another departure date</li>
          </ul>

          {/* Refund Timeline */}
          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-8 mb-3">
            Refund Processing Time
          </h2>

          <p className="mb-6">
            Approved refunds are processed within <b>7–10 business days</b>
            to the original payment method used during booking.
          </p>

          {/* Contact */}
          <h2 className="text-2xl font-bold text-[#1a2b4c] mt-8 mb-3">
            Need Help?
          </h2>

          <p>
            If you have questions regarding cancellations or refunds,
            please contact us:
          </p>

          <div className="mt-3 font-medium text-[#1a2b4c]">
            <p>Email: support@ghoomosasteme.com</p>
            <p>Phone: +91 7827372844</p>
          </div>

        </div>
      </section>

    </main>
  );
};

export default RefundPolicy;