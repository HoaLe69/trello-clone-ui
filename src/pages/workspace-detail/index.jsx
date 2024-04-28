import React from 'react'
import styles from '../workspace/workspace.module.css'
import classNames from 'classnames/bind'
import Header from '../../components/header'
import WorkspaceTop from '../../components/workspace-top'
import NavWorkspace from '../../components/workspace-nav'
import { CiSearch } from 'react-icons/ci'

const cx = classNames.bind(styles)

const WorkspaceDetail = () => {
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
              <div className={cx('create_board')}>
                <span className={cx('create_board_title')}>
                  Create new board
                </span>
              </div>
              {/* {boards.map((board, index) => { */}
              {/*   return ( */}
              {/*     <BoardProject */}
              {/*       key={board} */}
              {/*       name={board} */}
              {/*       href={`/b/${index}/${board}`} */}
              {/*     /> */}
              {/*   ) */}
              {/* })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceDetail
