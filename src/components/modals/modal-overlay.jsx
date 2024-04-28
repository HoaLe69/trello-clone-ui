import React from 'react'
import styles from './modal.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const ModalOverlay = ({ children, isOpen }) => {
  return (
    <div
      style={{ display: isOpen ? 'flex' : 'none' }}
      className={cx('modal_overlay')}
    >
      {children}
    </div>
  )
}

export default ModalOverlay
