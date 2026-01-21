import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AuthContext } from '../../context/AuthContext';
import { setUser, clearUser } from '../../redux/slices/authSlice';
import { addToCart, removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import { addProduct, removeProduct } from '../../redux/slices/productsSlice';
import '../styles.css';

export const Experiment1c = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userName, login, logout } = useContext(AuthContext);
  const { user, role } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products.products);
  const cart = useSelector((state) => state.cart.items);
  const [loginUserName, setLoginUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    price: '',
    category: '',
  });

  const handleLogin = () => {
    if (loginUserName.trim()) {
      login(loginUserName);
      dispatch(
        setUser({
          user: loginUserName,
          role: selectedRole,
          token: `token_${Date.now()}`,
        })
      );
      setLoginUserName('');
    }
  };

  const handleLogout = () => {
    logout();
    dispatch(clearUser());
    dispatch(clearCart());
  };

  const handleAddProductForm = () => {
    if (newProductForm.name && newProductForm.price && newProductForm.category) {
      dispatch(
        addProduct({
          name: newProductForm.name,
          price: parseFloat(newProductForm.price),
          category: newProductForm.category,
        })
      );
      setNewProductForm({ name: '', price: '', category: '' });
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct(productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="experiment">
      <h2>Experiment 1c: Combined Context API + Redux Toolkit</h2>

      {/* Authentication Section */}
      <div className="auth-section">
        <h3>Authentication (Context API)</h3>
        <div className="auth-status">
          <p>Status: {isLoggedIn ? '✓ Logged In' : '✗ Logged Out'}</p>
          {isLoggedIn && (
            <>
              <p>User: {userName}</p>
              <p>Role: <strong>{role}</strong></p>
            </>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="login-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={loginUserName}
              onChange={(e) => setLoginUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={handleLogin}>Login</button>
          </div>
        ) : (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>

      {isLoggedIn && (
        <>
          {/* Admin Section - Only visible to admins */}
          {role === 'admin' && (
            <div className="admin-section">
              <h3>🔒 Admin Panel - Product Management</h3>
              <div className="form-section">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProductForm.name}
                  onChange={(e) =>
                    setNewProductForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProductForm.price}
                  onChange={(e) =>
                    setNewProductForm((prev) => ({ ...prev, price: e.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProductForm.category}
                  onChange={(e) =>
                    setNewProductForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                />
                <button onClick={handleAddProductForm}>Add Product</button>
              </div>

              <div className="admin-products">
                <h4>Product Inventory</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.category}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="delete-btn"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* User Section - Shopping */}
          <div className="user-section">
            <h3>Shopping Catalog</h3>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <h4>{product.name}</h4>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Category: {product.category}</p>
                  <button onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Shopping Cart */}
            <div className="cart-section">
              <h3>Shopping Cart ({cart.length} items)</h3>
              {cart.length > 0 ? (
                <>
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>${item.price.toFixed(2)}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="delete-btn"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-total">
                    <h4>Total: ${cartTotal.toFixed(2)}</h4>
                  </div>
                </>
              ) : (
                <p>Your cart is empty</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
