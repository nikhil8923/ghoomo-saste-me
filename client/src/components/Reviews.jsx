import React from 'react';
import { MapPin } from 'lucide-react';

const reviewsData = [
  {
    id: 1,
    name: 'Nikhil Chaudhary',
    initial: 'U',
    location: 'India',
    text: 'Never have I chosen a group travel option. I had never been on a group trip with so many other people before. It was a wonderful and lifetime experience I had.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Lavish',
    initial: 'T',
    location: 'Delhi',
    text: 'The Kasol-Kheerganga trek by Ghoomosasteme was conducted exceptionally well. Special thanks to our team leader (group captain) Nikhil Chaudhary.',
    image: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Hemanth',
    initial: 'H',
    location: 'Ladakh',
    text: 'Our trip to Bhutan was great! Our guide Huangin and our driver Mr Jamun were super nice, knowledgeable and accommodating.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Lovena Singhani',
    initial: 'L',
    location: 'Andaman',
    text: 'Had a wonderful experience during my weekend Manali-Sissu trip. Food, accommodation and travel throughout the journey was great.',
    image: 'sissu.jpg',
  }
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