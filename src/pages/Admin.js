import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter & Sort State
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        toast.success("Product deleted successfully.");
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Error deleting product: ", error);
        toast.error("Failed to delete product. Please try again.");
      }
    }
  }

  // Derived Data: Filtering & Sorting
  let filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.includes(searchTerm)
  );

  filteredProducts.sort((a, b) => {
    if (sortBy === "price-asc") return Number(a.price) - Number(b.price);
    if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
    if (sortBy === "name-asc") return a.name.localeCompare(b.name);
    if (sortBy === "name-desc") return b.name.localeCompare(a.name);
    // Default newest (assumes createdAt exists, otherwise fall back to ID)
    return b.createdAt - a.createdAt || b.id.localeCompare(a.id);
  });

  // Calculate simple analytics based on ALL products, not filtered
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (Number(p.price) || 0), 0);

  return (
    <AdminLayout 
      title="Dashboard Overview" 
      subtitle="Manage your store's inventory and details."
      actionButton={
        <Link to="/add-product" className="btn btn-primary" style={{ boxShadow: 'var(--shadow-sm)' }}>
          + Add New Product
        </Link>
      }
    >
      {/* Statistic Cards */}
      <div className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="stat-card animate-slide-up delay-1" style={{ backgroundColor: 'white', padding: '25px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--primary)' }}>
          <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Total Products</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>
            {loading ? "..." : totalProducts}
          </p>
        </div>
        <div className="stat-card animate-slide-up delay-2" style={{ backgroundColor: 'white', padding: '25px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid var(--secondary)' }}>
          <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Inventory Value</h4>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>
            {loading ? "..." : `₹${totalValue.toLocaleString()}`}
          </p>
        </div>
        <div className="stat-card animate-slide-up delay-3" style={{ backgroundColor: 'white', padding: '25px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', borderLeft: '4px solid #4caf50' }}>
          <h4 style={{ color: 'var(--text-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Store Status</h4>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4caf50', margin: '15px 0 0' }}>Online & Active</p>
        </div>
      </div>

      {/* Products Table Wrapper */}
      <div className="admin-table-wrapper animate-slide-up delay-4" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-md)', padding: '30px', boxShadow: 'var(--shadow-sm)' }}>
        
        {/* Table Controls (Search & Sort) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid var(--border)', paddingBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
          <h3 style={{ fontSize: '1.5rem', margin: 0 }}>Product Inventory</h3>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '10px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-dark)', minWidth: '250px', outline: 'none' }}
              className="admin-search-input"
            />
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ padding: '10px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-dark)', outline: 'none', backgroundColor: '#fafafa', cursor: 'pointer' }}
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', border: '3px solid rgba(0,0,0,0.1)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p>Loading inventory data...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#fafafa', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-dark)' }}>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '10px', fontSize: '1.2rem' }}>No products found</h4>
            <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
              {searchTerm ? `No results matching "${searchTerm}"` : "Your inventory is currently empty."}
            </p>
            {!searchTerm && <Link to="/add-product" className="btn btn-primary">Add Your First Product</Link>}
            {searchTerm && <button onClick={() => setSearchTerm("")} className="btn btn-outline" style={{ padding: '8px 16px' }}>Clear Search</button>}
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table" style={{ width: '100%', border: 'none' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: 'transparent', borderBottom: '2px solid var(--border)', padding: '15px' }}>Item</th>
                  <th style={{ backgroundColor: 'transparent', borderBottom: '2px solid var(--border)', padding: '15px' }}>Product Name</th>
                  <th style={{ backgroundColor: 'transparent', borderBottom: '2px solid var(--border)', padding: '15px' }}>Price</th>
                  <th style={{ backgroundColor: 'transparent', borderBottom: '2px solid var(--border)', padding: '15px' }}>ID</th>
                  <th style={{ backgroundColor: 'transparent', borderBottom: '2px solid var(--border)', padding: '15px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => (
                  <tr key={product.id} style={{ transition: 'background-color 0.2s' }}>
                    <td style={{ padding: '15px 10px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                        <img src={product.image || "https://via.placeholder.com/60"} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                      </div>
                    </td>
                    <td style={{ fontWeight: '600', padding: '15px 10px' }}>{product.name}</td>
                    <td style={{ color: 'var(--primary)', fontWeight: 'bold', padding: '15px 10px' }}>₹{Number(product.price).toLocaleString()}</td>
                    <td style={{ color: 'var(--text-light)', fontSize: '0.85rem', fontFamily: 'monospace', padding: '15px 10px', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {product.id}
                    </td>
                    <td className="actions" style={{ justifyContent: 'flex-end', padding: '15px 10px' }}>
                      <Link to={`/edit-product/${product.id}`} className="btn btn-outline btn-sm" style={{ padding: '6px 15px', borderRadius: '20px' }}>Edit</Link>
                      <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm" style={{ padding: '6px 15px', borderRadius: '20px', backgroundColor: '#e53935' }}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default Admin;