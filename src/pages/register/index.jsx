import classNames from 'classnames/bind'
import React from 'react'
import styles from '../login/loginPage.module.css'
import Logo from '../../components/shared/logo'
import Button from '../../components/shared/button'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Register = () => {
  return (
    <div className={cx('container')}>
      <form className={cx('form')}>
        <div className={cx('form_inner')}>
          <div className={cx('form_header')}>
            <Logo href="/" />
            <span>Welcome to Margelo</span>
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
            <input
              type="password"
              className={cx('form_input')}
              name="retype_password"
              placeholder="Retype your password"
            />
          </div>
          <div className="form_button">
            <Button href="/workspace">Register</Button>
          </div>
          <div>
            <Link to="/login" className={cx('form_link')}>
              Already have account ? Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
