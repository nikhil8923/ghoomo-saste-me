import React from 'react';
import { Link } from 'react-router-dom';

const TripSection = ({ title, subtitle, trips }) => {
  return (
    <section style={{ padding: '60px 20px', backgroundColor: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#333' }}>{title}</h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>{subtitle}</p>
        </div>

        {/* Trips Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '25px' 
        }}>
          {trips.map((trip) => (
            <div key={trip.id} style={{ 
              borderRadius: '15px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s' 
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Trip Image */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img 
                  /* NOTE: The leading "/" before "images" is CRITICAL. 
                    It tells React to look in the root public folder.
                  */
                  src={`/images/Get full Trip at just/${trip.image_name}`} 
                  alt={trip.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  onError={(e) => { e.target.src = "/images/gsm.jpeg" }} // Fallback if image fails
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px', 
                  background: '#ff5722', 
                  color: '#fff', 
                  padding: '5px 12px', 
                  borderRadius: '5px', 
                  fontWeight: 'bold' 
                }}>
                  ₹{trip.price}
                </div>
              </div>

              {/* Trip Details */}
              <div style={{ padding: '20px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem' }}>{trip.name}</h3>
                <p style={{ color: '#777', fontSize: '0.9rem', marginBottom: '15px' }}>
                  Explore the best of {trip.category} with Ghoomo Saste Me.
                </p>
                
                {/* View Itinerary Button */}
                <Link to={`/trip/${trip.id}`} style={{ textDecoration: 'none' }}>
                  <button style={{ 
                    width: '100%', 
                    padding: '12px', 
                    backgroundColor: '#000', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    View Itinerary
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TripSection;