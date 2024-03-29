import React from 'react'
import classNames from 'classnames/bind'
import styles from './board-canvas.module.css'
import Column from '../column'

const cx = classNames.bind(styles)

const BoardCanvas = ({ board }) => {
  const { columnOrderIds, columns } = board
  return (
    <div className={cx('board_canvas')}>
      <ol id="board" className={cx('board')}>
        {columns.map(col => {
          return <Column column={col} key={col._id} />
        })}
      </ol>
    </div>
  )
}

export default BoardCanvas
