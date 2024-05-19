import classNames from 'classnames/bind'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showCreatePopover } from '../../redux/popoverSlice'
import CreateWorkspaceModal from '../modals/modal-create-workspace'
import CreateMenuPopover from '../popover/header-create-menu-popover'
import Logo from '../shared/logo'
import { IoChevronDownOutline } from 'react-icons/io5'
import styles from './header.module.css'
import StarredListPopover from '../popover/header-starred-popover'
import UserAvatar from '../shared/user-avatar'
import { useLayer } from 'react-laag'

const cx = classNames.bind(styles)

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.auth.user)
  const [isOpen, setOpen] = useState(false)
  const close = () => {
    setOpen(false)
  }
  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    onDiappear: close,
    overflowContainer: false,
    placement: "bottom-end",
    triggerOffset: 12,
    containerOffset: 16,
    arrowOffset: 16,
  })
  return (
    <header className={cx('header_container')}>
      <div className={cx('header_container_overlay')}>
        <div className={cx('header')}>
          <Logo href="/" color="white" />
          <div className={cx('header_buttons')}>
            <div className={cx('header_button_wrap')}>
              <button className={cx('header_create_btn', 'transparent')}>
                Starred
                <span className={cx('button_icon')}>
                  <IoChevronDownOutline />
                </span>
              </button>
              <StarredListPopover />
            </div>
          </div>
          <div className={cx('header_buttons')}>
            <div className={cx('header_button_wrap')}>
              <button
                onClick={() => dispatch(showCreatePopover())}
                className={cx('header_create_btn')}
              >
                Create
              </button>
              <CreateMenuPopover />
            </div>
          </div>
          <>
            <div {...triggerProps} onClick={() => setOpen(!isOpen)} className={cx('user_profile')}>
              <UserAvatar small thumbail="#5142aa" displayName={userLogin?.email} />
              <span className={cx('user_profile_name')}>{userLogin?.email}</span>
            </div>
            {
              renderLayer(
                isOpen && (
                  <div {...layerProps} className={cx("profile_menu")}>
                    <button className={cx("profile_menu_btn")}>Log out</button>
                  </div>
                )
              )
            }
          </>
        </div>
      </div>
      <CreateWorkspaceModal />
    </header >
  )
}

export default Header
