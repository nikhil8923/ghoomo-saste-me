import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tripsData } from "../data/trips";
import { MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://iwlfokdsbfrpprxnzvju.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bGZva2RzYmZycHByeG56dmp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NjYxMjQsImV4cCI6MjA5NTE0MjEyNH0.TdBJ-z7EUn89W3bsU3-RyG1qUdGg6EQeIxOWaeLX_Mk"
);

// Card for hardcoded tripsData entries
const TripCard = ({ trip }) => {
  const price = trip.occupancy?.quad || trip.price;
  const originalPrice = trip.originalPrice;

  const discount = originalPrice
    ? Math.round(
        ((parseInt(String(originalPrice).replace(/,/g, "")) -
          parseInt(String(price).replace(/,/g, ""))) /
          parseInt(String(originalPrice).replace(/,/g, ""))) *
          100
      )
    : null;

  return (
    <div className="trip-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100">
      <div className="relative overflow-hidden" style={{ height: "160px" }}>
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <span className="bg-yellow-400 text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            {trip.duration}
          </span>
          {discount && discount > 0 && (
            <span className="bg-green-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
              {discount}% OFF
            </span>
          )}
        </div>
        {trip.rating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm flex items-center gap-1 px-1.5 py-0.5 rounded-full shadow-sm">
            <Star size={9} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-bold text-gray-800">{trip.rating}</span>
          </div>
        )}
        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
            <MapPin size={8} />
            <span className="text-[9px] font-medium truncate max-w-[130px]">
              {trip.location?.split(",")[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-1 group-hover:text-blue-700 transition-colors">
          {trip.title}
        </h3>
        <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed mb-2 flex-grow">
          {trip.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <div>
            {originalPrice && (
              <span className="text-[9px] line-through text-gray-400 block leading-none mb-0.5">
                ₹{originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-base font-black text-gray-900">₹{price}</span>
              <span className="text-[9px] text-gray-500">/ person</span>
            </div>
          </div>
          <Link
            to={`/trip/${trip.id}`}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all duration-150 shadow-sm"
          >
            Details
            <ChevronRight size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Card for admin-added Supabase destinations
const DestinationCard = ({ dest }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col border border-gray-100">
    <div className="relative overflow-hidden" style={{ height: "160px" }}>
      {dest.image_url ? (
        <img
          src={dest.image_url}
          alt={dest.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => {
            e.target.style.display = "none";
            e.target.parentNode.style.background = "linear-gradient(135deg,#dbeafe,#bfdbfe)";
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
          <MapPin size={32} className="text-blue-400" />
        </div>
      )}
      {/* "New" badge for admin-added destinations */}
      <div className="absolute top-2 left-2">
        <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          New
        </span>
      </div>
    </div>

    <div className="p-3 flex flex-col flex-grow">
      <h3 className="text-sm font-bold text-gray-900 leading-tight mb-1 line-clamp-1 group-hover:text-blue-700 transition-colors">
        {dest.name}
      </h3>
      {dest.description && (
        <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed flex-grow">
          {dest.description}
        </p>
      )}
      {/* No price/link since these don't have trip detail pages yet */}
      <div className="mt-auto pt-2 border-t border-gray-100">
        <span className="text-[10px] text-blue-600 font-semibold">Coming Soon</span>
      </div>
    </div>
  </div>
);

const AllTrips = () => {
  const [supabaseDestinations, setSupabaseDestinations] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data, error } = await supabase
          .from("destinations")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setSupabaseDestinations(data);
        }
      } catch (e) {
        // silently fail — hardcoded trips still show
      } finally {
        setLoadingExtra(false);
      }
    };

    fetchDestinations();
  }, []);

  const totalCount = tripsData.length + supabaseDestinations.length;

  return (
    <main className="pt-24 pb-24 md:pb-16 bg-[#f4f7f6] min-h-screen">
      <div className="max-w-7xl mx-auto px-3 md:px-6">

        {/* Header */}
        <div className="mb-5 md:mb-8">
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-600 mb-1">
            Handpicked Destinations
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            All Trips
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {totalCount} experiences across India
          </p>
        </div>

        {/* Grid — hardcoded trips first, then Supabase destinations */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {tripsData.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}

          {/* Supabase-added destinations appear at the end */}
          {supabaseDestinations.map((dest) => (
            <DestinationCard key={`db-${dest.id}`} dest={dest} />
          ))}

          {/* Skeleton placeholders while loading */}
          {loadingExtra && [...Array(2)].map((_, i) => (
            <div key={`skel-${i}`} className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse border border-gray-100">
              <div className="bg-gray-200 h-40 w-full" />
              <div className="p-3">
                <div className="bg-gray-200 h-4 rounded w-3/4 mb-2" />
                <div className="bg-gray-200 h-3 rounded w-full mb-1" />
                <div className="bg-gray-200 h-3 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
};

export default AllTrips;