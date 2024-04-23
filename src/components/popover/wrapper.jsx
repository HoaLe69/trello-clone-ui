import React, { useEffect, useRef } from 'react'
import styles from './poperver.module.css'
import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import { hideCreatePopover } from '../../redux/popoverSlice'

const cx = classNames.bind(styles)

const Wrapper = ({ children, isOpen }) => {
  const refContainer = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOnPopover = e => {
      const elContainer = refContainer.current
      if (elContainer && !elContainer.contains(e.target)) {
        dispatch(hideCreatePopover())
      }
    }
    document.addEventListener('mouseup', handleClickOnPopover)
    return () => document.removeEventListener('mouseup', handleClickOnPopover)
  }, [refContainer, dispatch])

  return (
    <section
      ref={refContainer}
      style={{ display: isOpen ? 'block' : 'none' }}
      className={cx('header_create_menu_popover')}
    >
      <div className={cx('wrapper')}>
        <nav className={cx('popover_nav')}>
          <ul className={cx('nav_list')}>{children}</ul>
        </nav>
      </div>
    </section>
  )
}

export default Wrapper
