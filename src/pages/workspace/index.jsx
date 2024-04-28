import React from 'react'
import classNames from 'classnames/bind'
import style from './workspace.module.css'
import Header from '../../components/header'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import NavWorkspace from '../../components/workspace-nav'
const cx = classNames.bind(style)

const WorkSpace = () => {
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
            <h2 className={cx('board_header')}>Boards</h2>
            <div className={cx('boards')}>
              <div className={cx('create_board')}>
                <span className={cx('create_board_title')}>
                  Create new board
                </span>
              </div>
              {boards.map((board, index) => {
                return (
                  <BoardProject
                    key={board}
                    name={board}
                    href={`/b/${index}/${board}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkSpace

const BoardProject = ({ href, name }) => {
  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <div className={cx('board')}>
        <span className={cx('board_title')}>{name}</span>
      </div>
    </Link>
  )
}
