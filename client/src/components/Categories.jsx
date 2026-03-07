import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'backpacking',
    title: 'Backpacking Trips',
    image: '/backpacking.jpg',
    path: '/category/backpacking'
  },
  {
    id: 'kashmir-volvo-special',
    title: 'Kashmir Special',
    image: '/kashmir-main.jpg',
    path: '/trip/kashmir-volvo-special' 
  },
  {
    id: 'uttarakhand',
    title: 'Uttarakhand Trek',
    image: '/uttarakhand.jpg',
    path: '/category/uttarakhand'
  }
];

const Categories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black italic uppercase text-[#1a2b4c] mb-12 border-l-8 border-blue-600 pl-6">
          Explore Categories
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.id} 
              to={cat.path} 
              className="group relative h-[400px] rounded-[40px] overflow-hidden shadow-2xl block"
            >
              <img 
                src={cat.image} 
                alt={cat.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2b4c] to-transparent opacity-70" />
              <div className="absolute bottom-10 left-10">
                <h3 className="text-3xl font-black text-white uppercase italic">{cat.title}</h3>
                <p className="text-yellow-400 font-bold uppercase tracking-widest text-xs mt-2 italic">View Packages →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;