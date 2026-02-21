import React, { useState, useEffect } from 'react';

const OfferPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '10px' // Added padding for mobile breathing room
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '450px', // Slightly narrower to look better
        maxHeight: '90vh', // Ensures it never goes off-screen
        borderRadius: '20px',
        overflowY: 'auto', // Allows scrolling if content is too long
        backgroundColor: '#fff',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            fontWeight: 'bold',
            zIndex: 10,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          ✕
        </button>

        {/* Header Image using 2.png */}
        <div style={{
          width: '100%',
          height: '180px', // Fixed height for the image area
          backgroundImage: 'url("/images/Get full Trip at just/2.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottom: '4px solid #ff5722'
        }} />

        {/* Content Section */}
        <div style={{ padding: '20px 25px' }}>
          <p style={{ color: '#ff5722', margin: '0', fontWeight: 'bold', fontSize: '14px' }}>
            LOW BUDGET. HIGH ADVENTURE.
          </p>
          <h2 style={{ fontSize: '1.8rem', margin: '10px 0', color: '#333', lineHeight: '1.2' }}>
            Explore India @ Just <span style={{color: '#00bcd4'}}>₹5000</span>
          </h2>
          
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
            Middle-class friendly travel is here!<br/>
            Mountains, temples, treks & adventures.
          </p>

          <div style={{ 
            background: '#f8f8f8', 
            padding: '12px', 
            borderRadius: '10px', 
            margin: '10px 0',
            fontSize: '13px',
            fontWeight: '600',
            border: '1px dashed #ccc'
          }}>
            Manali | Kedarnath | Chopta | Rishikesh | Kasol
          </div>

          <p style={{ fontSize: '12px', color: '#999', margin: '10px 0' }}>
            *Perfect for students, solo travellers & friends*
          </p>

          <button style={{
            backgroundColor: '#ff5722',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
            transition: '0.3s'
          }}>
            BOOK MY BUDGET TRIP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferPopup;