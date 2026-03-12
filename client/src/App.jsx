import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import TripDetails from "./pages/TripDetails";
import StateTrips from "./pages/StateTrips";
import Payments from "./pages/Payments";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import AllTrips from "./pages/AllTrips";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import Sitemap from "./pages/Sitemap";
import Career from "./pages/Career";
import Blogs from "./pages/Blogs";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import OfferPopup from "./components/OfferPopup";
import MobileBottomNav from "./components/MobileBottomNav";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>

      <Header />
      <OfferPopup />
        <ScrollToTop />

      <main className="min-h-screen flex flex-col">

        <Routes>

          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* ABOUT */}
          <Route path="/about" element={<About />} />

          {/* TRIP DETAILS */}
          <Route path="/trip/:id" element={<TripDetails />} />

          {/* STATE TRIPS */}
          <Route path="/state/:stateId" element={<StateTrips />} />

          {/* CATEGORY PAGE */}
          <Route path="/category/:categoryId" element={<CategoryPage />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* PAYMENTS */}
          <Route path="/payments" element={<Payments />} />
          <Route path="/trips" element={<AllTrips />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
<Route path="/sitemap" element={<Sitemap />} />
<Route path="/career" element={<Career />} />
<Route path="/blogs" element={<Blogs />} />

        </Routes>

        <MobileBottomNav />
       

      </main>

      <Footer />

    </Router>
  );
}