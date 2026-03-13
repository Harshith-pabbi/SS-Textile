import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, getDoc, collection, query, where, getDocs, limit } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProduct(data);
          // Set initial main image (first in array or fallback string)
          setMainImage(data.images && data.images.length > 0 ? data.images[0] : (data.image || "https://via.placeholder.com/400"));

          // Fetch Related Products after product is loaded
          if (data.category) {
            fetchRelatedProducts(data.category, docSnap.id);
          }
        } else {
          console.error("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRelatedProducts(category, currentId) {
      try {
        const q = query(
          collection(db, "products"),
          where("category", "==", category),
          limit(5) // Fetch 5, since one might be the current product
        );
        const querySnapshot = await getDocs(q);
        const related = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== currentId) {
            related.push({ id: doc.id, ...doc.data() });
          }
        });
        // Keep exactly 4 if available
        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    }
    
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container loading">Loading product details...</div>;
  if (!product) return <div className="container error">Product not found. <Link to="/">Go back home</Link></div>;

  return (
    <div className="container section">
      <Link to="/" className="back-link">&larr; Back to Shop</Link>
      
      <div className="product-details">
        <div className="details-image-container">
          <img src={mainImage} alt={product.name} className="details-img"/>
          
          {/* Swiping Image Gallery (Thumbnails) */}
          {product.images && product.images.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: mainImage === img ? '2px solid var(--primary)' : '2px solid transparent',
                    opacity: mainImage === img ? 1 : 0.6,
                    transition: 'var(--transition-fast)',
                    flexShrink: 0
                  }}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="details-info">
          <h1>{product.name}</h1>
          <p className="details-price">₹{product.price}</p>
          
          <div className="details-description">
            <h3>Description</h3>
            <p>{product.description || "No description available for this authentic textile."}</p>
          </div>
          
          <button 
            className="btn btn-primary btn-large" 
            onClick={() => {
              const phoneNumber = "919876543210"; // Placeholder phone number
              const message = `Hello! I am interested in the ${product.name} (ID: ${product.id}). Is it available?`;
              window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
            }}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '10px',
              backgroundColor: '#25D366', // WhatsApp Green
              borderColor: '#25D366'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Inquire via WhatsApp
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--border-light)' }}>
          <h2 className="section-title" style={{ fontSize: '2rem', textAlign: 'left', marginBottom: '30px' }}>You May Also Like</h2>
          <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {relatedProducts.map(rp => (
              <ProductCard 
                key={rp.id} 
                id={rp.id} 
                name={rp.name} 
                price={rp.price} 
                image={rp.images ? rp.images[0] : rp.image} 
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;