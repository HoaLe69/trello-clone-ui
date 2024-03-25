import React from 'react'
import classNames from 'classnames/bind'
import styles from './logo.module.css'
import logoImg from '../../../assets/image/logoImg.svg'

const cx = classNames.bind(styles)

export default function Logo() {
  return (
    <div className={cx('container')}>
      <img src={logoImg} alt ='logo' className={cx('image')} />
      <div className={cx('name')}>
        <h1>Margelo</h1>
      </div>
    </div>
  )
}
