import React from 'react'
import classNames from 'classnames/bind'
import styles from './board-canvas.module.css'
import Column from '../column'
import ButtonAddList from '../button-add-list'
import { useSelector } from 'react-redux'

const cx = classNames.bind(styles)

const BoardCanvas = props => {
  const { columns } = props
  const newCol = useSelector(state => state.list.create.list)
  return (
    <div className={cx('board_canvas')}>
      <ol id="board" className={cx('board')}>
        {columns.map(col => {
          return <Column column={col} key={col._id} />
        })}
        {newCol.title && <Column column={newCol} />}
        <ButtonAddList />
      </ol>
    </div>
  )
}

export default BoardCanvas
