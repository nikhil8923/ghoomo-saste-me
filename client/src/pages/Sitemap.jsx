import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Sitemap = () => {

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <main className="pt-[115px] bg-white">

      {/* --- HERO SECTION --- */}
      <section className="bg-[#1a2b4c] py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Sitemap
          </h1>
          <p className="text-blue-200 text-lg md:text-xl max-w-3xl mx-auto font-bold uppercase tracking-widest">
            Navigate Through Our Website
          </p>
        </div>
      </section>

      {/* --- SITEMAP CONTENT --- */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a2b4c] mb-3">
              Website Sitemap
            </h2>
            <p className="text-gray-500">
              Navigate through all pages of Ghoomo Saste Me easily.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-10">

            {/* MAIN PAGES */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#1e52bc]">
                Main Pages
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                <li><Link to="/about" className="hover:text-blue-600">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                <li><Link to="/payments" className="hover:text-blue-600">Payments</Link></li>
              </ul>
            </div>

            {/* DESTINATIONS */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#1e52bc]">
                Destinations
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><Link to="/state/himachal" className="hover:text-blue-600">Himachal Trips</Link></li>
                <li><Link to="/state/uttarakhand" className="hover:text-blue-600">Uttarakhand Trips</Link></li>
                <li><Link to="/state/rajasthan" className="hover:text-blue-600">Rajasthan Trips</Link></li>
                <li><Link to="/state/kashmir" className="hover:text-blue-600">Kashmir Trips</Link></li>
              </ul>
            </div>

            {/* TRIP TYPES */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#1e52bc]">
                Trip Categories
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><Link to="/category/backpacking" className="hover:text-blue-600">Backpacking Trips</Link></li>
                <li><Link to="/category/weekend" className="hover:text-blue-600">Weekend Trips</Link></li>
                <li><Link to="/category/adventure" className="hover:text-blue-600">Adventure Trips</Link></li>
                <li><Link to="/category/corporate" className="hover:text-blue-600">Corporate Tours</Link></li>
              </ul>
            </div>

            {/* POLICIES */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#1e52bc]">
                Policies
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><Link to="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600">Terms & Conditions</Link></li>
                <li><Link to="/refund-policy" className="hover:text-blue-600">Refund Policy</Link></li>
              </ul>
            </div>

            {/* OTHER */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-[#1e52bc]">
                Other Pages
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li><Link to="/career" className="hover:text-blue-600">Careers</Link></li>
                <li><Link to="/blogs" className="hover:text-blue-600">Blogs</Link></li>
              </ul>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default Sitemap;