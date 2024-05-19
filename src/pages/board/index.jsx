import React, { useEffect } from 'react'
import Header from '../../components/header'
import Drawer from '../../components/drawer'
import BoardMainContent from '../../components/board-main-content'
import classNames from 'classnames/bind'
import styles from './board.module.css'
import { useDispatch } from 'react-redux'
import { resetStatus } from '../../redux/boardSlice'
import { Outlet } from 'react-router-dom'

const cx = classNames.bind(styles)

const BoardPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetStatus())
  }, [])
  return (
    <div className={cx('board_root')}>
      <Header />
      <div className={cx('board')}>
        <Drawer />
        <BoardMainContent />
      </div>
      <Outlet />
    </div>
  )
}

export default BoardPage
