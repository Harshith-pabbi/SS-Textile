import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--bg-color)', color: 'var(--white)', padding: '60px 5%', marginTop: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        
        <div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--secondary)', marginBottom: '20px' }}>SS Textile</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Weaving the rich heritage of Indian textiles into every thread. Your premier destination for luxury sarees, suit pieces, and authentic unstitched fabrics.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', letterSpacing: '1px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginBottom: '10px' }}><Link to="/" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>Home</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/about" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>About Us</Link></li>
            <li style={{ marginBottom: '10px' }}><Link to="/login" style={{ color: '#ccc', textDecoration: 'none', transition: 'color 0.3s' }}>Admin Portal</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '20px', letterSpacing: '1px' }}>Contact Us</h4>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '10px' }}>
            <strong>WhatsApp:</strong> +91 98765 43210
          </p>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '10px' }}>
            <strong>Email:</strong> support@sstextile.com
          </p>
          <p style={{ color: '#ccc', lineHeight: '1.6', fontSize: '0.95rem' }}>
            <strong>Address:</strong> 123 Textile Market, Ring Road, Surat, Gujarat 395002
          </p>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', marginTop: '50px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', color: '#999', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} SS Textile. All rights reserved. Built for luxury.
      </div>
    </footer>
  );
}

export default Footer;