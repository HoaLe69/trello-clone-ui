import React, { useEffect, useRef } from 'react'
import styles from './poperver.module.css'
import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import {
  hideAllPopover,
  hideCreateBoardPopover,
  hideCreatePopover
} from '../../redux/popoverSlice'

const cx = classNames.bind(styles)

const Wrapper = ({ children, isOpen, direction, type }) => {
  const refContainer = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const handleClickOnPopover = e => {
      const elContainer = refContainer.current
      if (elContainer && !elContainer.contains(e.target)) {
        if (type === 'board') dispatch(hideCreateBoardPopover())
        else {
          dispatch(hideCreatePopover())
        }
      }
    }
    const handleClosePopoverWhenChangeUrl = () => {
      dispatch(hideAllPopover())
    }
    document.addEventListener('mouseup', handleClickOnPopover)
    window.addEventListener('popstate', handleClosePopoverWhenChangeUrl)
    return () => {
      document.removeEventListener('mouseup', handleClickOnPopover)
      window.removeEventListener('popstate', handleClosePopoverWhenChangeUrl)
    }
  }, [refContainer, dispatch, type])

  return (
    <section
      ref={refContainer}
      style={{ display: isOpen ? 'block' : 'none' }}
      className={cx('header_create_menu_popover', { [direction]: direction })}
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
