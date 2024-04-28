import React from 'react'
import WorkSpace from '../pages/workspace/index'
import LanddingPage from '../pages/landding'
import { path } from '../config/index'
import BoardPage from '../pages/board'
import LoginPage from '../pages/login'
import Register from '../pages/register'
import ProtectedRoute from '../components/protected-route'
import WorkspaceDetail from '../pages/workspace-detail'

export const routesPublic = [
  {
    path: path.introduce,
    element: <LanddingPage />
  },
  {
    path: path.login,
    element: <LoginPage />
  },
  {
    path: path.register,
    element: <Register />
  }
]

export const routesForAuthenticateOnly = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: path.workspace,
        element: <WorkSpace />
      },
      {
        path: path.board,
        element: <BoardPage />
      },
      {
        path: path.workspaceDetail,
        element: <WorkspaceDetail />
      }
    ]
  }
]
