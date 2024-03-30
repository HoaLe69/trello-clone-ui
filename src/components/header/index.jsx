import classNames from 'classnames/bind'
import React from 'react'
import Logo from '../shared/logo'
import styles from './header.module.css'

const cx = classNames.bind(styles)

const Header = () => {
  return (
    <header className={cx('header_container')}>
      <div className={cx('header_container_overlay')}>
        <div className={cx('header')}>
          <Logo href="/" color="white" />
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
    </header>
  )
}

export default Header
