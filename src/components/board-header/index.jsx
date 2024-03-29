import classNames from 'classnames/bind'
import React from 'react'
import styles from './board-header.module.css'
import { LuListFilter } from 'react-icons/lu'
import { IoPersonAddOutline } from 'react-icons/io5'

const cx = classNames.bind(styles)

const BoardHeader = ({ board }) => {
  const { title } = board
  return (
    <div className={cx('board_header')}>
      <div className={cx('board_header_inner')}>
        <h2 className={cx('board_header_name')}>{title}</h2>
        <div className={cx('board_header_action')}>
          <button className={cx('board_header_filter_btn', 'animation-color')}>
            <span className={cx('icon')}>
              <LuListFilter />
            </span>
            Filter
          </button>
          <div className={cx('board_header_member')}>
            <div className={cx('member')}>
              <div className={cx('member_avatar')}>
                <img
                  src="https://trello-members.s3.amazonaws.com/65faedd37fd77eeff6fe973b/fabb17b9377e04034f3c619d84103425/170.png"
                  className={cx('member_avatar_img')}
                  alt="name member"
                />
              </div>
            </div>
            <div className={cx('member')}>
              <div className={cx('member_avatar')}>
                <img
                  src="https://trello-members.s3.amazonaws.com/65faedd37fd77eeff6fe973b/fabb17b9377e04034f3c619d84103425/170.png"
                  className={cx('member_avatar_img')}
                  alt="name member"
                />
              </div>
            </div>
            <div className={cx('member')}>
              <div className={cx('member_avatar')}>
                <img
                  src="https://trello-members.s3.amazonaws.com/65faedd37fd77eeff6fe973b/fabb17b9377e04034f3c619d84103425/170.png"
                  className={cx('member_avatar_img')}
                  alt="name member"
                />
              </div>
            </div>
          </div>
          <button className={cx('board_header_invite_btn')}>
            <span className={cx('icon')}>
              <IoPersonAddOutline />
            </span>
            Invites
          </button>
        </div>
      </div>
    </div>
  )
}

export default BoardHeader
