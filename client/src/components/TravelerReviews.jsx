import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    trip: "Kashmir Winter Trip",
    image: "/review1.jpg",
    review:
      "This was one of the best trips of my life. Everything from stay to trip captain was perfectly organized!"
  },
  {
    name: "Anjali Verma",
    trip: "Kasol Backpacking",
    image: "/review2.jpg",
    review:
      "Amazing experience with Ghoomo Saste Me. Met great people and explored beautiful places."
  },
  {
    name: "Aman Gupta",
    trip: "Manali & Solang Valley",
    image: "/review3.jpg",
    review:
      "Very budget friendly and well managed. Perfect for students and first time travelers."
  },
  {
    name: "Priya Singh",
    trip: "Rishikesh Adventure",
    image: "/review4.jpg",
    review:
      "Rafting, camping and bonfire nights were unforgettable. Highly recommended!"
  }
];

const TravelerReviews = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#1a2b4c] mb-12">
          What Our Travelers Say
        </h2>

        {/* Reviews Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible px-2 scrollbar-hide">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-[280px] md:min-w-0 bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >

              {/* Profile */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div>
                  <h4 className="font-bold text-gray-800">
                    {review.name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {review.trip}
                  </p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="text-sm text-gray-600">
                {review.review}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TravelerReviews;