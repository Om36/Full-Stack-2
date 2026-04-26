import { useState, useEffect } from 'react'

function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.text())
      .then(data => {
        setMessage(data)
        setLoading(false)
      })
      .catch(err => {
        setMessage('Backend not connected')
        setLoading(false)
      })
  }, [])

  return (
    <div className="app">
      <header>
        <h1>Fullstack Project</h1>
      </header>
      <main>
        <div className="card">
          <h2>Frontend: React + Vite</h2>
          <p>This is the React frontend served from Firebase.</p>
        </div>
        <div className="card">
          <h2>Backend Status</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p className="message">{message}</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App