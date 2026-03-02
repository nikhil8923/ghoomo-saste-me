import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TripDetails from './pages/TripDetails';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <Routes>
          {/* Homepage Route */}
          <Route path="/" element={<Home />} />
          
          {/* Dynamic Trip Route - The :id is the magic part! */}
          <Route path="/trip/:id" element={<TripDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}