import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routesPublic } from './route'
import LoginPage from './pages/login'

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  )
}

export default App
