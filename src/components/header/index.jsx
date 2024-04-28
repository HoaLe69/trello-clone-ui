import classNames from 'classnames/bind'
import React from 'react'
import { useDispatch } from 'react-redux'
import { showCreatePopover } from '../../redux/popoverSlice'
import CreateWorkspaceModal from '../modals/modal-create-workspace'
import CreateMenuPopover from '../popover/header-create-menu-popover'
import Logo from '../shared/logo'
import styles from './header.module.css'

const cx = classNames.bind(styles)

const Header = () => {
  const dispatch = useDispatch()
  return (
    <header className={cx('header_container')}>
      <div className={cx('header_container_overlay')}>
        <div className={cx('header')}>
          <Logo href="/" color="white" />
          <div className={cx('header_buttons')}>
            <div className={cx('header_button_wrap')}>
              <button
                onClick={() => dispatch(showCreatePopover())}
                className={cx('header_create_btn')}
              >
                Create
              </button>
              <CreateMenuPopover />
            </div>
          </div>
          <div className={cx('user_profile')}>
            <div className={cx('user_profile_wrap_img')}>
              <img
                className={cx('user_profile_img')}
                src="https://cdn.chanhtuoi.com/uploads/2022/01/hinh-avatar-nam-deo-kinh.jpg"
                alt="user profile"
              />
            </div>
            <span className={cx('user_profile_name')}>Lee Hoa</span>
          </div>
        </div>
      </div>
      <CreateWorkspaceModal />
    </header>
  )
}

export default Header
