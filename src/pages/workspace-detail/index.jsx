import React, { useEffect } from 'react'
import styles from '../workspace/workspace.module.css'
import classNames from 'classnames/bind'
import Header from '../../components/header'
import WorkspaceTop from '../../components/workspace-top'
import NavWorkspace from '../../components/workspace-nav'
import { CiSearch } from 'react-icons/ci'
import CreateBoardPopover from '../../components/popover/create-board-popover'
import { useDispatch, useSelector } from 'react-redux'
import { showCreateBoardPopover } from '../../redux/popoverSlice'
import { Link, useParams } from 'react-router-dom'
import { fetchListBoard } from '../../redux/api-client/board'
import { transformString } from '../../utils'
import { FaRegStar } from 'react-icons/fa'
import { FaStar } from 'react-icons/fa6'

const cx = classNames.bind(styles)

const WorkspaceDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      localStorage.setItem('current-workspace', id)
      dispatch(fetchListBoard(id))
    }
  }, [id, dispatch])
  const boards = useSelector(state => state.board.fetchList.list)
  return (
    <div className={cx('container')}>
      <Header />
      <div className={cx('workspace_main')}>
        <NavWorkspace />
        <div className={cx('workspace_boards')}>
          <WorkspaceTop />
          <hr />
          <div>
            <h2 className={cx('workspace_boards_heading')}>🚀 Your Boards</h2>
            <div className={cx('board_option')}>
              <div className={cx('board_sort')}>
                <span className={cx('sort_title')}>Sort by</span>
                <select className={cx('sort_select')}>
                  <option value="most">Most recently active</option>
                  <option value="least">Least recently active</option>
                  <option value="a-to-z">Alphabetically A-Z</option>
                  <option value="z-to-a">Alphabetically Z-A</option>
                </select>
              </div>
              <div className={cx('board_search')}>
                <span className={cx('filter_title')}>Search</span>
                <div className={cx('search_input_wrap')}>
                  <span className={cx('search_input_icon')}>
                    <CiSearch />
                  </span>
                  <input
                    className={cx('board_search_input')}
                    name="name_board"
                    placeholder="Search boards"
                  />
                </div>
              </div>
            </div>
            <div className={cx('boards')}>
              <div
                onClick={() => dispatch(showCreateBoardPopover())}
                className={cx('create_board')}
              >
                <span className={cx('create_board_title')}>
                  Create new board
                </span>
                <CreateBoardPopover isOpen />
              </div>
              {boards.map(board => {
                return (
                  <BoardProject
                    key={board.boardId}
                    background={board.background}
                    name={board.title}
                    href={`/b/${board.boardId}/${transformString(board.title)}`}
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

export default WorkspaceDetail

export const BoardProject = ({ href, state, name, background }) => {
  return (
    <Link
      style={{ backgroundColor: background }}
      className={cx('board_tile')}
      to={href}
      state={{ state }}
    >
      <span className={cx('board_tile_fade')} />
      <div className={cx('board_tile_detail')}>
        <div className={cx('board_tile_detail_name')}>{name}</div>
        <div className={cx('board_tile_detail_sub_container')}>
          <span className={cx('board_tile_detail_option')}>
            <FaRegStar />
          </span>
        </div>
      </div>
    </Link>
  )
}
