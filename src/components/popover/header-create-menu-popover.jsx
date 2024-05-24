import React from 'react'
import styles from './poperver.module.css'
import classNames from 'classnames/bind'
import { RiTrelloFill } from 'react-icons/ri'
import { BsPeople } from 'react-icons/bs'
import Wrapper from './wrapper'
import { useDispatch, useSelector } from 'react-redux'
import { selectorShowOrHide } from '../../redux/popoverSlice'
import { showCreateModal } from '../../redux/modalSlice'

const cx = classNames.bind(styles)

const CreateMenuPopover = () => {
  const isOpen = useSelector(selectorShowOrHide)
  const dispatch = useDispatch()
  return (
    <Wrapper isOpen={isOpen}>
      <li>
        <button className={cx('nav_button')}>
          <span className={cx('nav_button_title')}>
            <span className={cx('nav_button_icon')}>
              <RiTrelloFill />
            </span>
            Create Board
          </span>
          <div className={cx('nav_des')}>
            A board is made up of cards ordered on lists.Use it to manage
            projects, track infomation, or organize anything
          </div>
        </button>
      </li>
      <li>
        <button
          className={cx('nav_button')}
          onClick={() => dispatch(showCreateModal())}
        >
          <span className={cx('nav_button_title')}>
            <span className={cx('nav_button_icon')}>
              <BsPeople />
            </span>
            Create Workspace
          </span>
          <div className={cx('nav_des')}>
            A Workspace is a group of board and people. Use it to organize your
            company, side hustle, family, or friends
          </div>
        </button>
      </li>
    </Wrapper>
  )
}
export default CreateMenuPopover
