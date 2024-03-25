import React from 'react'
import classNames from 'classnames/bind'
import styles from './lanPage.module.css'
import Logo from '../components/shared/logo/logo'
import Button from '../components/shared/button/button'
import introduceImg from '../assets/image/introduce.webp'

const cx = classNames.bind(styles)
export default function LanddingPage() {
  return (
    <div>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <Logo />
          <div className={cx('title')}>
            <h1>LET&apos;S BUILD YOUR PROJECT</h1>
          </div>
          <div className={cx('btnHeader')}>
            <Button>Login</Button>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('container-content')}>
            <div className={cx('left-content')}>
              <h1>
                Margelo brings all your tasks, teammates, and tools together
              </h1>
              <p>Keep everything in the same place—even if your team isn’t.</p>
              {/* <div className={cx('content-signup')}>
                <input placeholder="Email" />
                <div>
                  <Button>Sign up - it&apos;s free</Button>
                </div>
              </div> */}
            </div>
            <div className={cx('right-content')}>
              <img src={introduceImg} alt='introduce' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
