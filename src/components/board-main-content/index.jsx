import BoardHeader from '../board-header'
import React from 'react'
import styles from './board-content.module.css'
import classNames from 'classnames/bind'
import BoardCanvas from '../board-canvas'
import { mockData } from '../../api/mock-data'

const cx = classNames.bind(styles)

const BoardMainContent = () => {
  const { board } = mockData
  return (
    <div className={cx('board_main_content')}>
      <BoardHeader board={board} />
      <BoardCanvas board={board} />
    </div>
  )
}

export default BoardMainContent
