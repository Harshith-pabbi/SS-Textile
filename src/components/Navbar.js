import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <nav className="navbar">
      {/* Left Links */}
      <div className="nav-links-left">
        <div className="mobile-menu-icon" style={{ cursor: 'pointer', fontSize: '1.2rem', marginRight: '15px' }}>
          &#9776;
        </div>
        <Link to="/">HOME</Link>
        <Link to="/#categories">OUR CATEGORIES</Link>
        <Link to="/#products">PRODUCTS</Link>
        <Link to="/about">ABOUT US</Link>
      </div>

      {/* Center Logo Area */}
      <Link to="/" className="navbar-brand-centered">
        <div className="logo-square-container">
          <div className="logo-square">
            <span>ST</span>
          </div>
        </div>
        <div className="logo-text-bottom">SS Textile</div>
      </Link>

      {/* Right Links */}
      <div className="nav-links-right">
        <Link to="/#gallery">GALLERY</Link>
        <Link to="/#videos">VIDEOS</Link>
        <Link to="/#testimonials">TESTIMONIALS</Link>
        
        {/* Keeping Admin Login in the More dropdown or right side so it's accessible */}
        <div className="more-dropdown">
          MORE <span>&#709;</span>
          <div className="dropdown-content">
            {currentUser ? (
              <>
                <Link to="/admin">Dashboard</Link>
                <button onClick={handleLogout} className="logout-btn-dropdown">Log Out</button>
              </>
            ) : (
              <Link to="/login">Admin Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;