import React from 'react'
import LanddingPage from '../pages/landding'
import { path } from '../config/index'
import BoardPage from '../pages/board'

export const routesPublic = [
  {
    path: path.introduce,
    component: <LanddingPage />
  },
  {
    path: path.board,
    component: <BoardPage />
  }
]
