import React from 'react'
import classNames from 'classnames/bind'
import styles from './logo.module.css'
import logoImg from '../../../assets/image/logoImg.svg'
import { Link } from 'react-router-dom'

const cx = classNames.bind(styles)

const Logo = ({ href, color = '#253858' }) => {
  return (
    <Link to={href} style={{ textDecoration: 'none' }}>
      <div className={cx('container')}>
        <img src={logoImg} alt="logo" className={cx('image')} />
        <div className={cx('name')}>
          <h1 style={{ color: `${color}` }}>Margelo</h1>
        </div>
      </div>
    </Link>
  )
}
export default Logo
