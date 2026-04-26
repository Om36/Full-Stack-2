import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('Fullstack Project')).toBeDefined()
  })

  it('shows frontend card', () => {
    render(<App />)
    expect(screen.getByText('Frontend: React + Vite')).toBeDefined()
  })
})