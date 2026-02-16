import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    // Test API caching
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(() => setData('Offline - using cache'))

    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🧪 PWA Experiment No 3</h1>
      <p>Status: <strong>{online ? '🟢 Online' : '🔴 Offline'}</strong></p>
      <p>API Data: <strong>{data || 'Loading...'}</strong></p>
      <div>
        <h3>✅ Verification Checklist:</h3>
        <ul>
          <li>Install icon in address bar</li>
          <li>App installs to desktop</li>
          <li>Static assets work offline</li>
          <li>API responses cached offline</li>
        </ul>
      </div>
    </div>
  )
}

export default App