import React from 'react'
import style from './button.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(style)

const Button = () => {
  return <button className={cx('btn')}>Test ok</button>
}

export default Button
