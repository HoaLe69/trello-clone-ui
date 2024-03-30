import React, { Fragment } from 'react'
import style from './button.module.css'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

const cx = classNames.bind(style)

const Button = ({ children, href }) => {
  let ButtonContainer = Fragment
  if (href) ButtonContainer = WrapButtonLink
  return (
    <ButtonContainer href={href}>
      <button className={cx('btn')}>{children}</button>
    </ButtonContainer>
  )
}

export default Button
const WrapButtonLink = ({ children, href }) => {
  return <Link to={href}>{children}</Link>
}
