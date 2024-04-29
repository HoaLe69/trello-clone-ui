import BoardHeader from '../board-header'
import React, { useEffect } from 'react'
import styles from './board-content.module.css'
import classNames from 'classnames/bind'
import BoardCanvas from '../board-canvas'
import { mockData } from '../../api/mock-data'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchDetailBoard } from '../../redux/api-client/board'

const cx = classNames.bind(styles)

const BoardMainContent = () => {
  const { board } = mockData
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      dispatch(fetchDetailBoard(id))
    }
  }, [id, dispatch])
  const boar = useSelector(state => state.board.fetch.board)
  console.log(boar)
  return (
    <div className={cx('board_main_content')}>
      <BoardHeader title={boar?.title} />
      <BoardCanvas board={board} />
    </div>
  )
}

export default BoardMainContent
