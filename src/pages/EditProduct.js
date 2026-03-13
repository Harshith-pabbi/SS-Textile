import { useState, useEffect } from "react";
import { db, storage } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sarees");
  const [isFeatured, setIsFeatured] = useState(false);
  const [currentImages, setCurrentImages] = useState([]); // Array of existing images
  const [newImageFiles, setNewImageFiles] = useState([]); // New image files to replace the existing ones
  
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setName(data.name || "");
          setPrice(data.price || "");
          setDescription(data.description || "");
          setCategory(data.category || "Sarees");
          setIsFeatured(data.isFeatured || false);
          // Handle backwards compatibility where 'image' exists instead of 'images'
          setCurrentImages(data.images ? data.images : (data.image ? [data.image] : []));
        } else {
          toast.error("Product not found.");
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageURLs = currentImages;

      // If new images were selected, upload them all and replace the old ones
      if (newImageFiles.length > 0) {
        const uploadPromises = newImageFiles.map(async (file) => {
          const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          return getDownloadURL(snapshot.ref);
        });
        
        imageURLs = await Promise.all(uploadPromises);
      }

      // Update Firestore document
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name,
        price: Number(price),
        description,
        category,
        isFeatured,
        images: imageURLs, // Array of all images
        image: imageURLs[0], // Primary image string for backwards compatibility
        updatedAt: new Date()
      });

      toast.success("Product Updated Successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating product: ", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setUpdating(false);
    }
  }

  if (loading) return (
    <AdminLayout title="Edit Product">
      <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)' }}>
        Loading product details...
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout 
      title="Edit Product" 
      subtitle={`Modifying ID: ${id}`}
      actionButton={
        <Link to="/admin" className="btn btn-outline">
          ← Back to Dashboard
        </Link>
      }
    >
      <div className="form-container" style={{ margin: '0 auto', borderTop: 'none', background: 'white', borderRadius: 'var(--radius-lg)' }}>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '14px 16px', border: '1px solid var(--border-dark)', borderRadius: 'var(--radius-sm)', fontFamily: "'Montserrat', sans-serif", backgroundColor: '#fafafa', outline: 'none' }}
            >
              <option value="Sarees">Sarees</option>
              <option value="Suit Pieces">Suit Pieces</option>
              <option value="Fabrics">Unstitched Fabrics</option>
              <option value="Lehengas">Lehengas</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              id="edit-featured" 
              checked={isFeatured} 
              onChange={(e) => setIsFeatured(e.target.checked)} 
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="edit-featured" style={{ cursor: 'pointer', margin: 0 }}>Mark as Featured Product (Highlight on Homepage)</label>
          </div>

          <div className="form-group">
            <label>Product Images</label>
            {currentImages.length > 0 && (
              <div style={{ marginBottom: "15px", borderRadius: "var(--radius-sm)", display: "block", border: "1px solid var(--border)", backgroundColor: '#f9f9f9', padding: '10px' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '10px', textTransform: 'uppercase' }}>Current Images</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {currentImages.map((img, idx) => (
                    <img key={idx} src={img} alt={`Current ${idx}`} height="80" style={{ display: "block", borderRadius: '4px', objectFit: 'cover' }} />
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ border: '1px dashed var(--border-dark)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa', textAlign: 'center', marginTop: '10px' }}>
              <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '10px', fontWeight: '500' }}>Upload New Images to REPLACE Existing (Optional)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setNewImageFiles(files);
                }}
                style={{ width: '100%', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
              />
              {newImageFiles.length > 0 && (
                <p style={{ marginTop: '10px', color: 'var(--primary)', fontSize: '0.9rem' }}>
                  {newImageFiles.length} file(s) selected for replacement
                </p>
              )}
            </div>
          </div>

          <button type="submit" disabled={updating} className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '15px' }}>
            {updating ? "Saving Changes..." : "Save Product Details"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default EditProduct;
