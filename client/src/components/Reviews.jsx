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
    name: 'Alisha',
    initial: 'T',
    location: 'Tehri',
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
    <section className="min-w-[280px] md:min-w-0 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#1a2b4c] mb-4">
            Happy Faces & Stories
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        {/* Reviews Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto md:overflow-visible pb-4 scrollbar-hide">
          {reviewsData.map((review) => (
            <div key={review.id} className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
              
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-xl text-[#1a2b4c]">
                  {review.initial}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{review.name}</h3>
                  <div className="flex items-center text-xs text-blue-600 font-semibold mt-1">
                    <MapPin size={12} className="mr-1" />
                    {review.location}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="min-w-[280px] md:min-w-0 bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition">
                "{review.text}"
              </p>

              {/* Memory Image */}
              <div className="w-full h-40 rounded-xl overflow-hidden mt-auto">
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