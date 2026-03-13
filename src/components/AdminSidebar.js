import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  
  const isActive = (path) => {
    return location.pathname === path || (path !== "/admin" && location.pathname.startsWith(path));
  };

  return (
    <div className="admin-sidebar" style={{ 
      width: '260px', 
      backgroundColor: 'var(--primary)', 
      color: 'white', 
      padding: '30px 20px', 
      boxShadow: '2px 0 15px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'fadeInSlideLeft 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
    }}>
      <h3 style={{ 
        fontFamily: "'Playfair Display', serif", 
        fontSize: '1.8rem', 
        marginBottom: '40px', 
        borderBottom: '1px solid rgba(255,255,255,0.2)', 
        paddingBottom: '20px',
        textAlign: 'center'
      }}>
        <Link to="/" style={{ color: 'white' }}>SS Textile<br/><span style={{fontSize: '0.9rem', opacity: 0.8, fontFamily: "'Montserrat', sans-serif", fontWeight: 400}}>Admin</span></Link>
      </h3>
      
      <ul style={{ listStyle: 'none', padding: 0, flex: 1 }}>
        <li style={{ marginBottom: '15px' }}>
          <Link to="/admin" style={{ 
            display: 'block',
            padding: '12px 20px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600', 
            letterSpacing: '1px', 
            textTransform: 'uppercase', 
            fontSize: '0.85rem',
            backgroundColor: isActive('/admin') ? 'rgba(255,255,255,0.15)' : 'transparent',
            color: 'white',
            transition: 'var(--transition-fast)'
          }}>Dashboard</Link>
        </li>
        <li style={{ marginBottom: '15px' }}>
          <Link to="/add-product" style={{ 
            display: 'block',
            padding: '12px 20px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: '600', 
            letterSpacing: '1px', 
            textTransform: 'uppercase', 
            fontSize: '0.85rem',
            backgroundColor: isActive('/add-product') ? 'rgba(255,255,255,0.15)' : 'transparent',
            color: 'white',
            transition: 'var(--transition-fast)'
          }}>+ Add Product</Link>
        </li>
        {isActive('/edit-product') && (
          <li style={{ marginBottom: '15px' }}>
            <span style={{ 
              display: 'block',
              padding: '12px 20px',
              borderRadius: 'var(--radius-sm)',
              fontWeight: '600', 
              letterSpacing: '1px', 
              textTransform: 'uppercase', 
              fontSize: '0.85rem',
              backgroundColor: 'rgba(255,255,255,0.15)',
            }}>Edit Product</span>
          </li>
        )}
      </ul>
      
      <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px' }}>
        <button 
          onClick={logout} 
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: 'transparent', 
            border: '1px solid rgba(255,255,255,0.5)', 
            color: 'white', 
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.85rem',
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'; }}
          onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
