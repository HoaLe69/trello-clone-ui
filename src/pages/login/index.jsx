import classNames from 'classnames/bind'
import React from 'react'
import styles from './loginPage.module.css'
import Logo from '../../components/shared/logo/logo'
import Button from '../../components/shared/button/button'
import BackgroundLoginPage from '../../assets/image/BackgroundLoginPage.jpg'
import bgLoginPage from '../../assets/image/bgLoginPage.png'


const cx = classNames.bind(styles)

export default function LoginPage() {
  return (
    <div className={cx('container')}>
      <img src={BackgroundLoginPage} className={cx('bg_image_left')} alt="" />
        <div className = {cx('login_form')}>
          <div className = {cx('header')}>
            <Logo/> 
            <div className={cx('span_text')}>
              Log in to continue
            </div>
          </div>

          <div className={cx('content')}>
                <input type="email" placeholder='Enter your email'  className={cx('content_email')} />
                <input type="text" placeholder='Enter your password' className={cx('content_password')} />        
                <Button className={cx('btn_login')}>Log in</Button>
                <a className={cx('create_acc_text')} href="">Create an account</a>
                <a className={cx('forget_pass_text')} href="">Forget password?</a>
          </div>

        </div>
      <img src={bgLoginPage} className={cx('bg_image_right')} alt="" />

    </div>
  )
}
