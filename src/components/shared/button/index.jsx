import React, { Fragment } from 'react'
import style from './button.module.css'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

const Button = ({ children, href, disable, ...props }) => {
  return (
    <ButtonContainer href={href}>
      <button className={cx('btn', { btn__disable: disable })} {...props}>
        {children}
      </button>
    </ButtonContainer>
  )
}

export default Button
const ButtonContainer = ({ children, href }) => {
  return href ? (
    <Link to={href}>{children}</Link>
  ) : (
    <Fragment>{children}</Fragment>
  )
}
