import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TripDetails = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page opens
    axios.get(`http://localhost:5000/api/trips/${id}`)
      .then(res => setTrip(res.data))
      .catch(err => console.error("Error fetching trip details:", err));
  }, [id]);

  if (!trip) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading Itinerary...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
        
        {/* Left Side: Image and Itinerary */}
        <div>
          <img 
            src={`/images/Get full Trip at just/${trip.image_name}`} 
            alt={trip.name} 
            style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }} 
          />
          <h1 style={{ marginTop: '20px', fontSize: '2.5rem' }}>{trip.name}</h1>
          <p style={{ color: '#777', fontSize: '1.1rem' }}>{trip.category} Expedition</p>
          
          <hr style={{ margin: '30px 0', border: '0.5px solid #eee' }} />
          
          <h3>Day-wise Itinerary</h3>
          <div style={{ lineHeight: '1.8', color: '#444' }}>
            <p><strong>Day 0:</strong> Departure from Delhi/Haridwar (Overnight Journey).</p>
            <p><strong>Day 1:</strong> Reach destination, Check-in to Hotel/Camps. Local Exploration.</p>
            <p><strong>Day 2:</strong> Main Sightseeing / Trekking Day. Evening Bonfire and Music.</p>
            <p><strong>Day 3:</strong> Riverside relaxation, Check-out, and return journey.</p>
          </div>
        </div>

        {/* Right Side: Booking Card */}
        <div style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '15px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h2 style={{ color: '#ff5722', marginBottom: '10px' }}>₹{trip.price}/-</h2>
          <p style={{ fontSize: '14px', color: '#666' }}>*Prices are inclusive of stay, meals, and travel.</p>
          
          <div style={{ marginTop: '25px' }}>
            <input type="text" placeholder="Your Name" style={inputStyle} />
            <input type="text" placeholder="Phone Number" style={inputStyle} />
            <button style={{ 
              width: '100%', 
              padding: '15px', 
              backgroundColor: '#25D366', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px', 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              marginTop: '10px'
            }}>
              Enquire via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  boxSizing: 'border-box'
};

export default TripDetails;