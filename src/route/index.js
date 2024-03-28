import React from 'react'
import LanddingPage from '../pages/landding/landding-page'
import { path } from '../config/index'
import LoginPage from '../pages/login'

export const routesPublic = [
  {
    path: path.introduce,
    component: <LanddingPage />
  },
  {
    path: path.login,
    component: <LoginPage />
  }
]
