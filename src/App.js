import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routesPublic } from './route'

function App() {
  return (
    <div className="App">
      <Routes>
        {routesPublic.map(route => {
          return (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          )
        })}
      </Routes>
    </div>
  )
}

export default App
