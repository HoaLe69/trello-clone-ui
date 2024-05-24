import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import style from './workspace.module.css'
import Header from '../../components/header'
import { Link } from 'react-router-dom'
import NavWorkspace from '../../components/workspace-nav'
import { useSelector } from 'react-redux'
import { axiosPrivate } from '../../config/axios'
import { BoardProject } from '../workspace-detail'
import { transformString } from '../../utils'

const cx = classNames.bind(style)

const WorkSpace = () => {
  const [guestBoard, setGuestBoard] = useState([])
  const user = useSelector(state => state.auth.user)
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await axiosPrivate.get(
          `/userboard/${user?.userId}/guest-board`
        )
        if (res.data) {
          setGuestBoard(res.data.data)
        }
      } catch (e) {
        console.log(e)
      }
    }
    if (user?.userId) {
      fetchBoards()
    }
  }, [user.userId])
  console.log(guestBoard)
  const boards = [
    'Trello Clone',
    'Facebook Clone',
    'Instagram',
    'Thread',
    'Twtiter',
    'Tiki',
    'Lazada'
  ]

  return (
    <div className={cx('container')}>
      <Header />
      <div className={cx('workspace_main')}>
        <NavWorkspace />
        <div className={cx('workspace_boards')}>
          <div className={cx('workspace_bottom')}>
            <h2 className={cx('board_header')}>Guest Board</h2>
            <div className={cx('boards')}>
              <div className={cx('create_board')}>
                <span className={cx('create_board_title')}>
                  Create new board
                </span>
              </div>
              {guestBoard.length > 0 ? (
                guestBoard.map((boardDetail, index) => {
                  const { board } = boardDetail
                  return (
                    <BoardProject
                      key={board.boardId}
                      name={board.title}
                      background={board.background}
                      state={{ guest: 'guest' }}
                      href={`/b/${board.boardId}/${transformString(board.title)}`}
                    />
                  )
                })
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkSpace
