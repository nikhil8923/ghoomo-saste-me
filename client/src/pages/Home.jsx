import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import UpcomingTrips from '../components/UpcomingTrips';
import Reels from '../components/Reels';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <main className="pt-[115px] flex-grow">
      <Hero />
      <Categories />
      <UpcomingTrips />
      <Reels />
      <Reviews />
      <FAQ />
    </main>
  );
};

export default Home;