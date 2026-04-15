import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE}/public/products`);
      setProducts(response.data || []);
    } catch (error) {
      setMessage('Unable to load public products.');
      setMessageType('error');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${API_BASE}/public/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Registration successful: ${data.message}`);
        setMessageType('success');
        setRegisterData({ username: '', email: '', password: '' });
      } else {
        setMessage(`Registration failed (${response.status}): ${data.message || data.error}`);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error during registration.');
      setMessageType('error');
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(`${API_BASE}/login`, loginData);
      const data = response.data;
      if (response.status === 200 && data.token) {
        localStorage.setItem('jwtToken', data.token);
        setToken(data.token);
        setMessage('Login succeeded. You can now call protected APIs.');
        setMessageType('success');
        setLoginData({ username: '', password: '' });
      } else {
        setMessage('Login failed. Check credentials.');
        setMessageType('error');
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        setMessage('Unauthorized login attempt.');
      } else {
        setMessage('Login error. Please try again.');
      }
      setMessageType('error');
    }
  };

  const fetchProtectedOrders = async () => {
    setMessage('');
    if (!token) {
      setMessage('Please login first to access protected resources.');
      setMessageType('error');
      return;
    }

    try {
      const response = await axios.get(`${API_BASE}/protected/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data || []);
      setMessage('Protected orders loaded successfully.');
      setMessageType('success');
    } catch (error) {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        setMessage('Session expired or unauthorized. Redirecting to login.');
        setMessageType('error');
        setToken('');
        localStorage.removeItem('jwtToken');
      } else {
        setMessage('Unable to fetch protected orders.');
        setMessageType('error');
      }
    }
  };

  const logout = () => {
    setToken('');
    localStorage.removeItem('jwtToken');
    setOrders([]);
    setMessage('Logged out successfully.');
    setMessageType('info');
  };

  return (
    <div className="app-container">
      <h1>React + Spring Boot Integration</h1>

      {message && <div className={`message ${messageType}`}>{message}</div>}

      <section>
        <h2>Public Products (GET)</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>User Registration (POST)</h2>
        <form onSubmit={handleRegisterSubmit} className="form-box">
          <label>
            Username
            <input
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              required
              minLength={6}
            />
          </label>
          <button type="submit">Register</button>
        </form>
      </section>

      <section>
        <h2>Login + JWT Protected API</h2>
        <form onSubmit={handleLoginSubmit} className="form-box">
          <label>
            Username
            <input
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
          </label>
          <button type="submit">Login</button>
          {token && <button type="button" onClick={logout}>Logout</button>}
        </form>

        <div className="protected-panel">
          <button onClick={fetchProtectedOrders}>Fetch Protected Orders</button>
          <div>Status: {token ? 'Authorized' : 'Not authorized'}</div>
        </div>

        {orders.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{order.item}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
