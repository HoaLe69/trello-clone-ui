import React from 'react'
import classNames from 'classnames/bind'
import style from './workspace.module.css'
import logo from '../../assets/image/logoworkspace.png'
import { FaRegStar } from 'react-icons/fa'
import { FaLock } from 'react-icons/fa'
import { FaPencilAlt } from 'react-icons/fa'
import { IoPersonAddOutline } from 'react-icons/io5'

const cx = classNames.bind(style)

const WorkSpace = () => {
  return (
    <div className={cx('container')}>
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
          <div className={cx('board_filter')}>
            <span className={cx('filter_title')}>Filter by</span>
            <select className={cx('filter_select')}>
              <option value="">Choose a collection</option>
            </select>
          </div>
        </div>
        <div className={cx('boards')}>
          <div className={cx('create_board')}>
            <span className={cx('create_board_title')}>Create new board</span>
          </div>
          <div className={cx('board')}>
            <span className={cx('board_title')}>Board name</span>
            <FaRegStar className={cx('board_star')} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkSpace
