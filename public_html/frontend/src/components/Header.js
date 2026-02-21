import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '15px 50px', 
      backgroundColor: '#fff', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src="/images/gsmlogo" alt="Ghoomo Saste Me" style={{ height: '45px' }} />
      </Link>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>Home</Link>
        <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Trips</span>
        <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Contact</span>
        <a href="tel:+91XXXXXXXXXX" style={{ 
          textDecoration: 'none', 
          backgroundColor: '#ff5722', 
          color: 'white', 
          padding: '10px 20px', 
          borderRadius: '25px', 
          fontWeight: 'bold' 
        }}>
          Call Now
        </a>
      </div>
    </nav>
  );
};

export default Header;