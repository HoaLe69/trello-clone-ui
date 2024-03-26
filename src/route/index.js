import React from 'react'
import LanddingPage from '../pages/landding/landding-page'
import { path } from '../config/index'

export const routesPublic = [
  {
    path: path.introduce,
    component: <LanddingPage />
  }
]
