import React from 'react';

const CategoryNav = () => {
  const categories = [
    "Upcoming Group Trips", "International Trips", "Domestic Trips", 
    "Weekend Trips", "Backpacking Trips", "Corporate Tours"
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '10px', background: '#fff' }}>
      {categories.map((cat, index) => (
        <div key={index} style={{ textAlign: 'center', cursor: 'pointer' }}>
          {/* Using 1.png and 2.png as decorative icons for the first two categories */}
          {index < 2 && <img src={`/images/Get full Trip at just/${index + 1}.png`} style={{height: '20px', marginRight: '5px'}} alt="" />}
          <span style={{ fontSize: '13px', fontWeight: '500' }}>{cat}</span>
        </div>
      ))}
    </div>
  );
};

export default CategoryNav;