import React from 'react'
import Header from '../../components/header'
import Drawer from '../../components/drawer'
import BoardMainContent from '../../components/board-main-content'
import classNames from 'classnames/bind'
import styles from './board.module.css'

const cx = classNames.bind(styles)

const BoardPage = () => {
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
