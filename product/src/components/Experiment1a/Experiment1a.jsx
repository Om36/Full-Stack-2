import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../styles.css';

export const Experiment1a = () => {
  const [inputValue, setInputValue] = useState('');
  const { isLoggedIn, userName, login, logout } = useContext(AuthContext);

  const handleLogin = () => {
    if (inputValue.trim()) {
      login(inputValue);
      setInputValue('');
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="experiment">
      <h2>Experiment 1a: React Context API - Authentication</h2>
      <div className="auth-status">
        <p>Status: {isLoggedIn ? '✓ Logged In' : '✗ Logged Out'}</p>
        {isLoggedIn && <p>User: {userName}</p>}
      </div>

      {!isLoggedIn ? (
        <div className="login-form">
          <input
            type="text"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      )}
    </div>
  );
};
