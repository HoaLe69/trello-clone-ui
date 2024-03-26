import React from 'react'
import style from './button.module.css'
import classNames from 'classnames/bind'

const cx = classNames.bind(style)

const Button = ({ children }) => {
  return <button className={cx('btn')}>{children}</button>
}

export default Button
