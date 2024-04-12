import React from 'react'
import classNames from 'classnames/bind'
import style from './workspace.module.css'
import logo from '../../assets/image/logoworkspace.png'
import { FaLock } from 'react-icons/fa'
import { FaPencilAlt } from 'react-icons/fa'
import Header from '../../components/header'
import { CiSearch } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { IoPersonAddOutline } from "react-icons/io5";
const cx = classNames.bind(style)

const WorkSpace = () => {
  const boards = ['Trello Clone', 'Facebook Clone', 'Instagram']
  return (
    <div className={cx('container')}>
      <Header />
      <div className={cx('workspace_top')}>
        <div className={cx('info')}>
          <img src={logo} alt="Logo" className={cx('info_img')} />
          <div className={cx('info_description')}>
            <div className={cx('info_description_top')}>
              <h3 className={cx('info_name')}>Margelo Workspace</h3>
              <FaPencilAlt className={cx('info_edit')} />
            </div>
            <div className={cx('info_description_bottom')}>
              <FaLock className={cx('lock_icon')} />
              <span className={cx('info_status')}>Private</span>
            </div>
          </div>
        </div>
        <button className={cx('btn_invite')}>
          <IoPersonAddOutline /> Invite Workspace members
        </button>
      </div>
      <div className={cx('horizontal_rule')}></div>
      <div className={cx('workspace_bottom')}>
        <h2 className={cx('board_header')}>Boards</h2>
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
            <span className={cx('create_board_title')}>Create new board</span>
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
  )
}

export default WorkSpace

const BoardProject = ({ href, name }) => {
  return (
    <Link to={href}>
      <div className={cx('board')}>
        <span className={cx('board_title')}>{name}</span>
      </div>
    </Link>
  )
}
