import React from 'react'
import styles from './modal.module.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const ModalOverlay = ({ children, isOpen, onClick, center }) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: isOpen ? 'flex' : 'none',
        alignItems: center ? 'center' : 'start'
      }}
      className={cx('modal_overlay')}
    >
      {children}
    </div>
  )
}

export default ModalOverlay
