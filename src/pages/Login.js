import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      toast.success("Welcome to the Admin Dashboard!");
      // Once logged in, go to the admin dashboard
      navigate("/admin");
    } catch (err) {
      setError("Failed to log in.");
      toast.error("Login failed. Check your credentials.");
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
          
          {/* Overlapping Floating Banner Title */}
          <div className="login-header-banner">
            <h2 className="login-header-text">User Login</h2>
          </div>
          
          {error && <p className="error" style={{ color: "#ff6b6b", background: 'rgba(255,0,0,0.1)', border: 'none', textAlign: 'center' }}>{error}</p>}
          
          <form onSubmit={handleSubmit} className="auth-form">
            
            {/* Username/Email Input Group */}
            <div className="input-group">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Username" /* Matched exactly to user image */
              />
            </div>

            {/* Password Input Group */}
            <div className="input-group">
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password" /* Matched exactly to user image */
              />
            </div>
            
            {/* Footer Row exactly matching the layout: Checkbox on left, Button on right */}
            <div className="login-footer-row">
              <label className="remember-me-label">
                <input type="checkbox" className="remember-checkbox" />
                <svg style={{ position: 'absolute', width: '10px', height: '10px', color: '#1A2433', pointerEvents: 'none', left: '48px', opacity: 0 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Remember me
              </label>

              <button type="submit" disabled={loading} className="login-btn">
                {loading ? "Authenticating..." : "Login"}
              </button>
            </div>
          </form>
        </div>
    </div>
  );
}

export default Login;
