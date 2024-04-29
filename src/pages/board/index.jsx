import React, { useEffect } from 'react'
import Header from '../../components/header'
import Drawer from '../../components/drawer'
import BoardMainContent from '../../components/board-main-content'
import classNames from 'classnames/bind'
import styles from './board.module.css'
import { useDispatch } from 'react-redux'
import { resetStatus } from '../../redux/boardSlice'

const cx = classNames.bind(styles)

const BoardPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetStatus())
  }, [])
  return (
    <div>
      <Header />
      <div className={cx('board')}>
        <Drawer />
        <BoardMainContent />
      </div>
    </div>
  )
}

export default BoardPage
