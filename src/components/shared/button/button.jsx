import React from 'react'
import style from './button.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(style)

const Button = () => {
  return <button className={cx('btn')}>Test</button>
}

export default Button
