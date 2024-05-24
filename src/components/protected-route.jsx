import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router'
import { axiosPrivate } from '../config/axios'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.token)
  useLayoutEffect(() => {
    if (token) {
      axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      navigate('/login', { replace: true })
      delete axiosPrivate.defaults.headers.common['Authorization']
    }
  }, [token, navigate])
  return <Outlet />
}

export default ProtectedRoute
