import React from 'react'
import styles from './nav.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const NavWorkspace = () => {
  return (
    <div className={cx('nav')}>
      <div className={cx('nav_main_title')}>Workspaces</div>
    </div>
  )
}

export default NavWorkspace
