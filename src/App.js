import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalWhatsApp from "./components/GlobalWhatsApp";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import About from "./pages/About";

import { Toaster } from "react-hot-toast";

function App(){

  return(
    <AuthProvider>
      <BrowserRouter>

        {/* Global Toast Notifications */}
        <Toaster 
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "'Montserrat', sans-serif",
              borderRadius: '8px',
              border: '1px solid #ECECEC',
            },
          }}
        />

        <Navbar />

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/add-product" element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          } />
          <Route path="/edit-product/:id" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />

        </Routes>

        <GlobalWhatsApp />
        <Footer />

      </BrowserRouter>
    </AuthProvider>
  )

}

export default App