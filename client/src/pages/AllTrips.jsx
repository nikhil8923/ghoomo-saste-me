import React from "react";
import { Link } from "react-router-dom";
import { tripsData } from "../data/trips";

const AllTrips = () => {
  return (
    <main className="pt-32 pb-20 bg-[#f7f9fc] min-h-screen">

      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-4xl font-extrabold text-[#1a2b4c] mb-10">
          Explore All Trips
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {tripsData.map((trip) => (

            <div
              key={trip.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
            >

              {/* Image */}

              <div className="h-56 overflow-hidden">

                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />

              </div>

              {/* Content */}

              <div className="p-5 flex flex-col flex-grow">

                <h3 className="text-xl font-bold text-[#1a2b4c] mb-2">
                  {trip.title}
                </h3>

                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                  {trip.description}
                </p>

                <div className="flex justify-between items-center mt-auto">

                  <div>

                    <span className="text-xs line-through text-gray-400 block">
                      ₹{trip.originalPrice}
                    </span>

                    <span className="text-lg font-bold text-gray-900">
                      ₹{trip.price}
                    </span>

                  </div>

                  <Link
                    to={`/trip/${trip.id}`}
                    className="bg-[#1a2b4c] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700"
                  >
                    View Trip
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
};

export default AllTrips;