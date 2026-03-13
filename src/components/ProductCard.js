import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function ProductCard({ id, name, price, image }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card">
      <Link to={`/product/${id}`} className="card-link">
        <div className="card-img-container">
          <img src={image || "https://via.placeholder.com/200"} alt={name} className="card-img" />
        </div>
        <div className="card-info">
          <h3 className="card-title">{name}</h3>
          <p className="card-price">₹{price}</p>
        </div>
      </Link>
      
      <div className="card-action">
        <button className="btn btn-outline" onClick={() => addToCart({ id, name, price, image })}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;