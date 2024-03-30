import React from 'react'
import WorkSpace from '../pages/workspace/index'
import LanddingPage from '../pages/landding'
import { path } from '../config/index'
import BoardPage from '../pages/board'
import LoginPage from '../pages/login'

export const routesPublic = [
  {
    path: path.introduce,
    component: <LanddingPage />
  },
  {
    path: path.workspace,
    component: <WorkSpace />
  },
  {
    path: path.board,
    component: <BoardPage />
  },
  {
    path: path.login,
    component: <LoginPage />
  }
]
