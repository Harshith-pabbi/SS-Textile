import { useState } from "react";
import { db, storage } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../components/AdminLayout";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sarees");
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price || imageFiles.length === 0) {
      toast.error("Please fill in name, price, and select at least one image.");
      return;
    }

    setUploading(true);

    try {
      // 1. Upload ALL images to Firebase Storage
      const uploadPromises = imageFiles.map(async (file) => {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        return getDownloadURL(snapshot.ref);
      });
      
      const downloadURLs = await Promise.all(uploadPromises);

      // 2. Save product details to Firestore
      await addDoc(collection(db, "products"), {
        name,
        price: Number(price),
        description,
        category,
        isFeatured,
        images: downloadURLs, // Now saving an array of images
        image: downloadURLs[0], // Backwards compatibility for primary image code
        createdAt: new Date()
      });

      toast.success("Product Added Successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <AdminLayout 
      title="Add New Product" 
      subtitle="Upload a new fabric to your catalog."
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
              placeholder="e.g. Handwoven Silk Saree"
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Describe the fabric, material, and care instructions..."
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
              id="featured" 
              checked={isFeatured} 
              onChange={(e) => setIsFeatured(e.target.checked)} 
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <label htmlFor="featured" style={{ cursor: 'pointer', margin: 0 }}>Mark as Featured Product (Highlight on Homepage)</label>
          </div>

          <div className="form-group">
            <label>Product Images (Select multiple)</label>
            <div style={{ border: '1px dashed var(--border-dark)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#fafafa', textAlign: 'center' }}>
              <input
                type="file"
                accept="image/*"
                multiple
                required
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  setImageFiles(files);
                }}
                style={{ width: '100%', cursor: 'pointer', backgroundColor: 'transparent', border: 'none' }}
              />
              {imageFiles.length > 0 && (
                <p style={{ marginTop: '10px', color: 'var(--primary)', fontSize: '0.9rem' }}>
                  {imageFiles.length} file(s) selected
                </p>
              )}
            </div>
          </div>

          <button type="submit" disabled={uploading} className="btn btn-primary" style={{ width: '100%', marginTop: '20px', padding: '15px' }}>
            {uploading ? "Uploading to Catalog..." : "Publish Product"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddProduct;