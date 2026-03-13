import React from 'react';

function Hero() {
  return (
    <div className="hero-section-cyan">
      <div className="hero-content-left">
        <h1 className="hero-title-cursive">Best and Exclusive</h1>
        <h2 className="hero-subtitle-block">Collection of Fabric</h2>
        <button className="hero-enquire-btn">Enquire Now</button>
      </div>
      <div className="hero-image-right">
        {/* Placeholder for the woman holding fabric, using a clean cyan backdrop image */}
        <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=1000" alt="Collection of Fabric" />
      </div>
    </div>
  );
}

export default Hero;