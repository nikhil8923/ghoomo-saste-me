import React from 'react';
import { MapPin } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: 'Nikhil Chaudhary',
    initial: 'N',
    location: 'Himachal Pradesh',
    text: 'Choosing the Himachal Backpacking group trip was the best decision. I had never traveled with so many strangers before, but the energy and coordination made it a lifetime experience.',
    image: '/hfk4.jpg',
  },
  {
    id: 2,
    name: 'Lavish',
    initial: 'L',
    location: 'Kasol-Kheerganga',
    text: 'The Kasol-Kheerganga trek was conducted exceptionally well. The views from the top were breathtaking, and special thanks to our group captain for managing the bonfire and music night so perfectly.',
    image: '/hfk1.webp',
  },
  {
    id: 3,
    name: 'Hemanth',
    initial: 'H',
    location: 'Kedarnath Dham',
    text: 'Our Kedarnath Yatra was spiritually uplifting and incredibly smooth. The trekking guidance and the campsite stay near the temple made this difficult journey feel like a breeze.',
    image: '/hfk2.jpg',
  },
  {
    id: 4,
    name: 'Lovena Singhani',
    initial: 'L',
    location: 'Manali-Sissu',
    text: 'Had a wonderful experience during my Manali-Sissu weekend trip. Crossing the Atal Tunnel and exploring the snowy landscapes of Sissu was organized flawlessly by the team.',
    image: '/hfk3.jpg',
  },
];

const Reviews = () => {
  return (
    <section className="bg-white p-4 md:p-6 rounded-2xl shadow-md">
      
      <div className="container mx-auto px-3 max-w-7xl">

        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#1a2b4c] mb-3">
            Happy Faces & Stories
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Reviews Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible pb-4 scrollbar-hide">

          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-lg transition border border-gray-100 flex flex-col justify-between min-w-[220px] md:min-w-0"
            >

              {/* User Info */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-sm text-[#1a2b4c]">
                  {review.initial}
                </div>

                <div>
                  <h3 className="font-bold text-sm text-gray-800">
                    {review.name}
                  </h3>

                  <div className="flex items-center text-[11px] text-blue-600 font-semibold mt-1">
                    <MapPin size={11} className="mr-1" />
                    {review.location}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="bg-white p-3 text-xs rounded-xl shadow-sm flex-grow min-h-[90px]">
                "{review.text}"
              </p>

              {/* Memory Image */}
              <div className="w-full h-28 rounded-lg overflow-hidden mt-3">
                <img
                  src={review.image}
                  alt={`${review.location} trip memory`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Reviews;