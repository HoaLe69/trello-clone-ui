import React from 'react'
import style from './button.module.css'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
const cx = classNames.bind(style)

const Button = ({ children }) => {
  return <button className={cx('btn')}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.node.isRequired
}

export default Button
