function About() {
  return (
    <div>
      <div className="hero" style={{ height: '50vh', minHeight: '400px', background: 'linear-gradient(rgba(42, 42, 42, 0.7), rgba(92, 22, 46, 0.6)), url("https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=1600") center/cover no-repeat' }}>
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Weaving tradition and luxury into every handcrafted textile.</p>
        </div>
      </div>

      <div className="container section">
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title">The Heritage of SS Textile</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: '30px' }}>
            Founded with a passion for preserving the rich, vibrant heritage of Indian textiles, SS Textile curates the most exquisite, handwoven fabrics from master artisans across the country.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: 1.8, marginBottom: '50px' }}>
            From the bustling looms of Banaras to the intricate embroidery of Kutch, our collection is a testament to centuries of craftsmanship. We believe that a true luxury textile is not just a piece of fabric, but a canvas that tells a story of culture, dedication, and unparalleled skill.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '60px' }}>
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--secondary)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '15px' }}>Authenticity</h3>
            <p style={{ color: 'var(--text-light)' }}>Every weave is sourced directly from ethical weavers, ensuring 100% authenticity and uncompromising quality.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--primary)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '15px' }}>Craftsmanship</h3>
            <p style={{ color: 'var(--text-light)' }}>We celebrate the slow, meticulous art of hand-looming, resulting in fabrics that last generations.</p>
          </div>
          <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderTop: '4px solid var(--secondary)' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '15px' }}>Elegance</h3>
            <p style={{ color: 'var(--text-light)' }}>Our collections are curated for the modern connoisseur, blending timeless tradition with contemporary luxury.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
