import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login (add API later)
    localStorage.setItem('user', JSON.stringify({ loggedIn: true }));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <form onSubmit={onLogin}>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}

function Dashboard({ onLogout }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={onLogout}>Logout</button>
      {/* Your dashboard content */}
    </div>
  );
}

export default App;
