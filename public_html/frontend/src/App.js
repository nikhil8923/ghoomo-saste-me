import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import Hero from './components/Hero';
import ExploreCategories from './components/ExploreCategories';
import TripSection from './components/TripSection';
import OfferPopup from './components/OfferPopup';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

// Pages
import TripDetails from './pages/TripDetails';

function App() {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/trips')
      .then(res => setTrips(res.data))
      .catch(err => console.error("API Connection Error:", err));
  }, []);

  const filteredTrips = trips.filter(trip => 
    trip.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <OfferPopup />
        <Header />
        <CategoryNav />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero setSearchQuery={setSearchQuery} />
              <ExploreCategories />
              
              <TripSection 
                title="Vibrant Himachal" 
                subtitle="Pocket friendly trips to the land of mountains" 
                trips={filteredTrips.filter(t => t.category === 'Himachal')} 
              />

              <TripSection 
                title="Spiritual Uttarakhand" 
                subtitle="Experience the divine beauty of the Himalayas" 
                trips={filteredTrips.filter(t => t.category === 'Uttarakhand')} 
              />
              
              <FAQ />
            </>
          } />

          <Route path="/trip/:id" element={<TripDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;