import BoardHeader from '../board-header'
import React, { useEffect } from 'react'
import styles from './board-content.module.css'
import classNames from 'classnames/bind'
import BoardCanvas from '../board-canvas'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailBoard } from '../../redux/api-client/board'

const cx = classNames.bind(styles)

const BoardMainContent = () => {
  // const { board } = mockData
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailBoard(id))
    }
  }, [id, dispatch])
  const board = useSelector(state => state.board.detail.board)
  const status = useSelector(state => state.board.detail.status)
  useEffect(() => {
    if (board.background) {
      var root = document.documentElement
      root.style.setProperty('--board-bg', board.background)
    }
  }, [board])
  return (
    <div className={cx('board_main_content')}>
      {status === 'loading' || status === 'idle' ? (
        <div>loading...</div>
      ) : (
        <>
          <BoardHeader title={board.title} />
          <BoardCanvas columns={board.columns} />
        </>
      )}
    </div>
  )
}

export default BoardMainContent
