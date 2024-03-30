import classNames from 'classnames/bind'
import React from 'react'
import styles from './loginPage.module.css'
import Logo from '../../components/shared/logo'
import Button from '../../components/shared/button'

const cx = classNames.bind(styles)

const LoginPage = () => {
  return (
    <div className={cx('container')}>
      <form className={cx('form')}>
        <div className={cx('form_inner')}>
          <div className={cx('form_header')}>
            <Logo href="/" />
            <span>Login in to continue</span>
          </div>
          <div className={cx('form_container_input')}>
            <input
              type="email"
              className={cx('form_input')}
              name="email"
              placeholder="Enter your email"
            />
            <input
              type="password"
              className={cx('form_input')}
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="form_button">
            <Button href="/workspace">Log in</Button>
          </div>
          <div>
            <a href="/" className={cx('form_link')}>
              Create an account
            </a>
            <a href="/" className={cx('form_link')}>
              Forget password ?
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
