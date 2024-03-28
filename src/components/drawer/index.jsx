import React from 'react'
import classNames from 'classnames/bind'
import styles from './drawer.module.css'
import { BsChevronLeft, BsThreeDots } from 'react-icons/bs'
import { HiOutlineViewBoards } from 'react-icons/hi'
import { FiPlus } from 'react-icons/fi'

const cx = classNames.bind(styles)

const Drawer = () => {
  const projects = ['Trello Clone', 'FaceBook', 'Instagram']
  return (
    <div className={cx('drawer_container')}>
      <div className={cx('drawer_header')}>
        <div className={cx('drawer_header_logo')}>M</div>
        <a href="/" className={cx('drawer_header_link')}>
          Margelo Workspace
        </a>
        <span className={cx('drawer_header_icon')}>
          <BsChevronLeft />
        </span>
      </div>
      <div className={cx('drawer_body')}>
        <div className={cx('drawer_body_wrap_link')}>
          <a href="/" className={cx('drawer_body_link')}>
            <span className={cx('drawer_body_icon')}>
              <HiOutlineViewBoards style={{ fontSize: '1rem' }} />
            </span>
            <span className={cx('drawer_body_text')}>Boards</span>
          </a>
        </div>
        <div className={cx('drawer_body_project')}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
            Your board
          </span>
          <span
            className={cx('drawer_body_icon', 'drawer_body_icon__right')}
            style={{ marginLeft: 'auto' }}
          >
            <FiPlus />
          </span>
        </div>
        <ul className={cx('drawer_body_project_list')}>
          {projects.map(project => {
            return (
              <li className={cx('drawer_body_project_item')} key={project}>
                <a className={cx('drawer_body_link')} href="/">
                  {project}
                </a>
                <span
                  style={{ marginLeft: 'auto' }}
                  className={cx(
                    'drawer_body_icon',
                    'drawer_body_icon__right',
                    'drawer_body_icon__display'
                  )}
                >
                  <BsThreeDots />
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Drawer
