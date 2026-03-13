import React from 'react';

function SkeletonCard() {
  return (
    <div className="product-card" style={{ border: 'none', boxShadow: 'none', background: 'transparent' }}>
      <div className="skeleton skeleton-card" style={{ width: '100%', paddingTop: '120%', borderRadius: '0', position: 'relative' }}>
      </div>
      <div style={{ padding: '20px' }}>
        <div className="skeleton" style={{ height: '20px', width: '80%', marginBottom: '10px' }}></div>
        <div className="skeleton" style={{ height: '15px', width: '40%' }}></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
