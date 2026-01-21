import { useState } from 'react'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { Experiment1a } from './components/Experiment1a/Experiment1a'
import { Experiment1b } from './components/Experiment1b/Experiment1b'
import { Experiment1c } from './components/Experiment1c/Experiment1c'

function App() {
  const [activeExperiment, setActiveExperiment] = useState(1)

  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="app-container">
          <header className="app-header">
            <h1>Full Stack Complete - Unit 1 Experiments</h1>
            <p>React Context API & Redux Toolkit State Management</p>
          </header>

          <nav className="nav-tabs">
            <button
              className={`nav-btn ${activeExperiment === 1 ? 'active' : ''}`}
              onClick={() => setActiveExperiment(1)}
            >
              Experiment 1a: Context API
            </button>
            <button
              className={`nav-btn ${activeExperiment === 2 ? 'active' : ''}`}
              onClick={() => setActiveExperiment(2)}
            >
              Experiment 1b: Redux Toolkit
            </button>
            <button
              className={`nav-btn ${activeExperiment === 3 ? 'active' : ''}`}
              onClick={() => setActiveExperiment(3)}
            >
              Experiment 1c: Combined
            </button>
          </nav>

          <main className="app-main">
            {activeExperiment === 1 && <Experiment1a />}
            {activeExperiment === 2 && <Experiment1b />}
            {activeExperiment === 3 && <Experiment1c />}
          </main>

          <footer className="app-footer">
            <p>NAAC Integrated Full Stack Development Curriculum</p>
          </footer>
        </div>
      </AuthProvider>
    </Provider>
  )
}

export default App
