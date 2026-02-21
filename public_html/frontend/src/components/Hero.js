import React from 'react';

const Hero = ({ setSearchQuery }) => {
  return (
    <div style={{ 
      position: 'relative', 
      height: '75vh', 
      width: '100%',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color: 'white',
      overflow: 'hidden',
      backgroundColor: '#1a1a1a' // Fallback color while video loads
    }}>
      
      {/* Background Video Section */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ 
          position: 'absolute', 
          top: '50%',
          left: '50%',
          width: '100%', 
          height: '100%', 
          objectFit: 'cover', 
          transform: 'translate(-50%, -50%)',
          zIndex: 0 
        }}
      >
        {/* Leading slash / is mandatory to access the public folder */}
        <source src="/images/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay to make text readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 1
      }}></div>

      {/* Main Content */}
      <div style={{ 
        textAlign: 'center', 
        zIndex: 2, 
        padding: '0 20px' 
      }}>
        <h1 style={{ 
          fontSize: '3.5rem', 
          fontWeight: '800', 
          marginBottom: '20px',
          textShadow: '2px 2px 10px rgba(0,0,0,0.5)' 
        }}>
          Pocket friendly trips, <br/> 
          <span style={{color: '#ff5722'}}>unforgettable memories</span>
        </h1>
        
        {/* Search Bar Implementation */}
        <div style={{ 
          marginTop: '30px', 
          display: 'flex', 
          justifyContent: 'center',
          boxShadow: '0 10px 25px rgba(0,0,0,0.2)' 
        }}>
          <input 
            type="text" 
            placeholder="Search Manali, Kedarnath, etc..." 
            onChange={(e) => setSearchQuery(e.target.value)} 
            style={{ 
              padding: '18px 25px', 
              width: '450px', 
              borderRadius: '12px 0 0 12px', 
              border: 'none', 
              fontSize: '1.1rem',
              outline: 'none' 
            }} 
          />
          <button style={{ 
            padding: '18px 35px', 
            borderRadius: '0 12px 12px 0', 
            border: 'none', 
            background: '#ff5722', 
            color: 'white', 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          onMouseOver={(e) => e.target.style.background = '#e64a19'}
          onMouseOut={(e) => e.target.style.background = '#ff5722'}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;