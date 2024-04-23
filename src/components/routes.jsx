import React from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routesPublic, routesForAuthenticateOnly } from '../route'

const Routes = () => {
  const router = createBrowserRouter([
    ...routesPublic,
    ...routesForAuthenticateOnly
  ])
  return <RouterProvider router={router} />
}

export default Routes
