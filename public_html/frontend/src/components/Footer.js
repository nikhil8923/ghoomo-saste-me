import React from 'react';

const Footer = () => {
  return (
    <footer style={{ background: '#1a1a1a', color: '#fff', padding: '60px 50px 20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>
        <div>
          <h3 style={{ color: '#ff5722' }}>Ghoomo Saste Me</h3>
          <p style={{ fontSize: '14px', color: '#bbb' }}>Travel more, spend less, and create real memories. We make budget travel easy and safe for everyone.</p>
        </div>
        <div>
          <h4>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#bbb', lineHeight: '2' }}>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Career With Us</li>
            <li>Our Blogs</li>
          </ul>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, color: '#bbb', lineHeight: '2' }}>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Cancellation & Refund Policy</li>
          </ul>
        </div>
        <div>
          <h4>Contact Us</h4>
          <p style={{ color: '#bbb', fontSize: '14px' }}>
            3rd Floor, Building No-436, Phase IV, Udyog Vihar, Sector-18, Gurugram, Haryana-122015<br/><br/>
            Email: hello@ghoomosasteme.in<br/>
            Phone: +91-9090403075
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid #333', paddingTop: '20px', fontSize: '12px', color: '#777' }}>
        © 2026 Ghoomo Saste Me (WANDERON EXPERIENCES PVT LTD). All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;