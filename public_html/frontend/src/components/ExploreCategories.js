import React from 'react';

const ExploreCategories = () => {
  const items = [
    { name: "Backpacking Trips", img: "3.png" },
    { name: "Weekend Getaways", img: "4.png" },
    { name: "Adventure Treks", img: "5.png" },
    { name: "Honeymoon Trips", img: "6.png" }
  ];

  return (
    <section style={{ padding: '50px 20px', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '30px' }}>Explore Categories</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <div key={index} style={{ width: '120px' }}>
            <div style={{ 
              width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', 
              margin: '0 auto 10px', border: '3px solid #ff5722' 
            }}>
              <img src={`/images/Get full Trip at just/${item.img}`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontWeight: '600', fontSize: '14px' }}>{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;