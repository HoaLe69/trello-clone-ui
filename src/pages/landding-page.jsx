import React from 'react'
import classNames from 'classnames/bind'
import styles from './landding-page.module.css'
import Logo from '../components/shared/logo/logo'
import Button from '../components/shared/button/button'
import introduceImg from '../assets/image/introduce.webp'
import bg from '../assets/image/bg.svg'

const cx = classNames.bind(styles)

export default function LanddingPage() {
  return (
    <div className={cx('container')} style={{ backgroundImage: `url(${bg})` }}>
      <div className={cx('header')}>
        <Logo />
        <div className={cx('title')}>
          <h1>LET&apos;S BUILD YOUR PROJECT</h1>
        </div>
        <div className={cx('btn-login')}>
          <Button>Login</Button>
        </div>
      </div>
      <div className={cx('heros')}>
        <div className={cx('left-heros')}>
          <h1 className={cx('slogan')}>
            Margelo brings all your tasks, teammates, and tools together
          </h1>
          <p>Keep everything in the same place—even if your team isn’t.</p>
        </div>
        <div className={cx('right-heros')}>
          <div className={cx('banner')}>
            <img
              src={introduceImg}
              alt="introduce"
              className={cx('banner_image')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
