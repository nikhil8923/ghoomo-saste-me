import React from "react";

const Terms = () => {
return ( <div className="pt-[120px] min-h-screen max-w-5xl mx-auto px-4 pb-16"> <h1 className="text-4xl font-bold text-[#1a2b4c] mb-6">
Terms & Conditions </h1>

  <p className="text-gray-600 mb-4">
    By booking a trip with Ghoomo Saste Me, you agree to the following
    terms and conditions.
  </p>

  <h2 className="text-2xl font-semibold mt-6 mb-2">Booking Policy</h2>
  <p className="text-gray-600 mb-4">
    All bookings must be confirmed with a valid payment. Availability
    of seats depends on trip capacity.
  </p>

  <h2 className="text-2xl font-semibold mt-6 mb-2">Traveler Responsibilities</h2>
  <p className="text-gray-600 mb-4">
    Travelers must follow trip guidelines and instructions provided by
    the trip captain during the journey.
  </p>

  <h2 className="text-2xl font-semibold mt-6 mb-2">Changes & Modifications</h2>
  <p className="text-gray-600">
    Ghoomo Saste Me reserves the right to modify itineraries due to
    weather conditions, safety concerns or operational reasons.
  </p>
</div>


);
};

export default Terms;
