import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container section min-h-screen">
      <h2 className="section-title">Your Cart</h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <p style={{ fontSize: "1.2rem", color: "var(--text-light)", marginBottom: "30px" }}>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="cart-container" style={{ maxWidth: "900px", margin: "0 auto" }}>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.image ? (
                      <img src={item.image} alt={item.name} width="70" className="img-thumbnail" style={{ objectFit: 'cover', height: '70px' }} />
                    ) : (
                      <div style={{ width: 70, height: 70, backgroundColor: '#eee', borderRadius: '4px' }}></div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600, fontSize: "1.1rem" }}>{item.name}</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 600, fontSize: "1.1rem" }}>₹{item.price}</td>
                  <td>
                    <button 
                      onClick={() => removeFromCart(index)} 
                      className="btn btn-outline btn-sm"
                      style={{ padding: "6px 15px" }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ 
            marginTop: "40px", 
            textAlign: "right", 
            padding: "35px", 
            backgroundColor: "var(--white)", 
            borderRadius: "var(--radius-md)", 
            border: "1px solid var(--border)", 
            boxShadow: "var(--shadow-sm)" 
          }}>
            <h3 style={{ fontSize: "1.8rem", marginBottom: "25px", fontFamily: "'Cormorant Garamond', serif" }}>
              Total: <span style={{ color: "var(--primary)" }}>₹{total}</span>
            </h3>
            <button className="btn btn-primary btn-large">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;