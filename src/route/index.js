import React from 'react'
import LanddingPage from '../pages/landding/landding-page'
import WorkSpace from '../pages/workspace/index'
import { path } from '../config/index'

export const routesPublic = [
  {
    path: path.introduce,
    component: <LanddingPage />
  },
  {
    path: path.workspace,
    component: <WorkSpace />
  }
]
