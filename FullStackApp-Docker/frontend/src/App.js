import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/messages')
      .then((response) => {
        if (!response.ok) {
          throw new Error('API error');
        }
        return response.json();
      })
      .then(setMessages)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Full Stack App</h1>
        <p>This app is served by Nginx and talks to the Spring Boot backend.</p>
        {error && <p className="error">Error loading messages: {error}</p>}
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
