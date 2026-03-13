import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { db } from "../firebase/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import SkeletonCard from "../components/SkeletonCard";
import useScrollReveal from "../hooks/useScrollReveal";
import Hero from "../components/Hero"; // Import our new Cyan split Hero

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize scroll reveal hook
  useScrollReveal();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(20));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const featuredProducts = products.filter(p => p.isFeatured);

  // Demo Categories mapping directly to the user's screenshot
  const demoCategories = [
    { name: 'Woolen Fabric', img: 'https://images.unsplash.com/photo-1606550604130-97cce0ef3536?w=400' },
    { name: 'Silk Fabric', img: 'https://images.unsplash.com/photo-1549419149-ea217b11d8d8?w=400' },
    { name: 'Cotton Fabric', img: 'https://images.unsplash.com/photo-1582218433355-667954e3fc45?w=400' },
    { name: 'Polyester Fabric', img: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400' }
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Our Categories Section */}
      <section className="section-cyan reveal-element" id="categories">
        <h2 className="section-title-cyan">Our Categories</h2>
        
        <div className="category-grid-cyan">
          {demoCategories.map((cat, index) => (
            <div key={index} className={`category-card-cyan reveal-element delay-${index + 1}`}>
              <img src={cat.img} alt={cat.name} />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Section */}
      <section className="section-cyan reveal-element" id="products" style={{ backgroundColor: '#fcfcfc' }}>
        <h2 className="section-title-cyan">Featured Products</h2>
        
        <div className="featured-slider-cyan">
          {loading ? (
            [...Array(6)].map((_, idx) => <div key={`skel-${idx}`} className="featured-slider-item"><SkeletonCard /></div>)
          ) : featuredProducts.length > 0 ? (
            featuredProducts.map((p) => (
              <div key={p.id} className="featured-slider-item">
                <ProductCard id={p.id} name={p.name} price={p.price} image={p.images ? p.images[0] : p.image} />
              </div>
            ))
          ) : (
            // Fallback empty state styling if no products are featured
            products.slice(0, 6).map((p) => (
              <div key={p.id} className="featured-slider-item">
                <ProductCard id={p.id} name={p.name} price={p.price} image={p.images ? p.images[0] : p.image} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Gallery Section (Placeholder to match design) */}
      <section className="section-cyan reveal-element" id="gallery">
        <h2 className="section-title-cyan">Gallery</h2>
        <div className="category-grid-cyan" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          <div className="category-card-cyan reveal-element delay-1"><img src="https://images.unsplash.com/photo-1516086884606-fed3de3e87ad?w=600" alt="Gallery 1" /></div>
          <div className="category-card-cyan reveal-element delay-2"><img src="https://images.unsplash.com/photo-1510368142416-6472b5c777e5?w=600" alt="Gallery 2" /></div>
          <div className="category-card-cyan reveal-element delay-3"><img src="https://images.unsplash.com/photo-1605000578683-118cf67d4f9f?w=600" alt="Gallery 3" /></div>
        </div>
      </section>

      {/* 5. Videos Section (Placeholder to match design) */}
      <section className="section-cyan reveal-element" id="videos" style={{ backgroundColor: '#fcfcfc' }}>
        <h2 className="section-title-cyan">Videos</h2>
        <div className="category-grid-cyan" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
           <div className="category-card-cyan reveal-element delay-1">
             <div style={{ backgroundColor: '#111', height: '250px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '15px' }}>
               ▶ Field to Fabric - How is Cotton Processed
             </div>
           </div>
           <div className="category-card-cyan reveal-element delay-2">
             <div style={{ backgroundColor: '#111', height: '250px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '15px' }}>
               ▶ Types of Silk Fabric
             </div>
           </div>
        </div>
      </section>

    </div>
  );
}

export default Home;