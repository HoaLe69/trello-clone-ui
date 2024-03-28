import BoardHeader from '../board-header'
import React from 'react'
import styles from './board-content.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const BoardMainContent = () => {
  return (
    <div className={cx('board_main_content')}>
      <BoardHeader />
    </div>
  )
}

export default BoardMainContent
