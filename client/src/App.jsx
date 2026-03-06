import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import About from './pages/About'; 
import TripDetails from './pages/TripDetails';
import StateTrips from './pages/StateTrips';
import Payments from './pages/Payments';
import Contact from './pages/Contact';
import CategoryPage from './pages/CategoryPage';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import OfferPopup from './components/OfferPopup';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <OfferPopup />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/trip/:id" element={<TripDetails />} />
            <Route path="/state/:stateId" element={<StateTrips />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
