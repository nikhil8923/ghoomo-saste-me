import React from "react";

const RefundPolicy = () => {
return ( <div className="pt-[120px] min-h-screen max-w-5xl mx-auto px-4 pb-16">

```
  <h1 className="text-4xl font-bold text-[#1a2b4c] mb-6">
    Cancellation & Refund Policy
  </h1>

  <p className="text-gray-600 mb-6">
    At Ghoomo Saste Me, we understand that plans may change. 
    Our cancellation and refund policy ensures fairness for both travelers and organizers.
  </p>

  {/* Cancellation Policy */}

  <h2 className="text-2xl font-semibold mt-6 mb-3">
    Trip Cancellation by Traveler
  </h2>

  <ul className="list-disc pl-6 text-gray-600 space-y-2">
    <li>30 days or more before departure – 90% refund.</li>
    <li>15–29 days before departure – 50% refund.</li>
    <li>7–14 days before departure – 25% refund.</li>
    <li>Less than 7 days before departure – No refund.</li>
  </ul>

  {/* Organizer Cancellation */}

  <h2 className="text-2xl font-semibold mt-8 mb-3">
    Trip Cancellation by Organizer
  </h2>

  <p className="text-gray-600 mb-4">
    If Ghoomo Saste Me cancels a trip due to operational issues,
    weather conditions, or insufficient bookings, travelers will
    receive either:
  </p>

  <ul className="list-disc pl-6 text-gray-600 space-y-2">
    <li>Full refund of the booking amount</li>
    <li>Option to reschedule for another departure date</li>
  </ul>

  {/* Refund Timeline */}

  <h2 className="text-2xl font-semibold mt-8 mb-3">
    Refund Processing Time
  </h2>

  <p className="text-gray-600 mb-4">
    Approved refunds are processed within <b>7–10 business days</b>
    to the original payment method used during booking.
  </p>

  {/* Contact */}

  <h2 className="text-2xl font-semibold mt-8 mb-3">
    Need Help?
  </h2>

  <p className="text-gray-600">
    If you have questions regarding cancellations or refunds,
    please contact us:
  </p>

  <div className="mt-3 text-gray-700 font-medium">
    <p>Email: support@ghoomosasteme.com</p>
    <p>Phone: +91 7827372844</p>
  </div>

</div>


);
};

export default RefundPolicy;
