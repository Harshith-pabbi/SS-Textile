import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children, title, subtitle, actionButton }) {
  return (
    <div className="admin-layout" style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#f4f5f7',
      backgroundImage: "linear-gradient(rgba(42, 42, 42, 0.7), rgba(92, 22, 46, 0.8)), url('https://images.unsplash.com/photo-1584063854378-2c2e0b12bc1d?q=80&w=1600')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      color: 'var(--white)'
    }}>
      <AdminSidebar />
      
      <div className="admin-main-content" style={{ flex: 1, padding: '40px 5%', overflowY: 'auto' }}>
        <div className="admin-header animate-slide-up" style={{ borderBottom: 'none', marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: '2.4rem', marginBottom: '5px', color: 'var(--white)', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '1px' }}>
              {title}
            </h2>
            {subtitle && (
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontFamily: "'Montserrat', sans-serif", fontSize: '0.95rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {actionButton && (
            <div className="animate-slide-up delay-1">
              {actionButton}
            </div>
          )}
        </div>
        
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
