import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import styles from './board-header.module.css'
import { LuListFilter } from 'react-icons/lu'
import { IoPersonAddOutline } from 'react-icons/io5'
import InviteModal from '../modals/invite-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchListUserBoard } from '../../redux/api-client/user'
import UserAvatar from '../shared/user-avatar'

const cx = classNames.bind(styles)

const BoardHeader = ({ title }) => {
  const [isOpen, setOpen] = useState(false)
  const handleShowInviteModal = () => {
    setOpen(true)
  }
  const { id } = useParams()
  const listUserBoard = useSelector(state => state.user.fetchList.list)
  const status = useSelector(state => state.user.fetchList.status)
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      dispatch(fetchListUserBoard(id))
    }
  }, [id, dispatch])
  return (
    <>
      <div className={cx('board_header')}>
        <div className={cx('board_header_inner')}>
          <h2 className={cx('board_header_name')}>{title}</h2>
          <div className={cx('board_header_action')}>
            <button
              className={cx('board_header_filter_btn', 'animation-color')}
            >
              <span className={cx('icon')}>
                <LuListFilter />
              </span>
              Filter
            </button>
            <div className={cx('board_header_member')}>
              {listUserBoard.map(user => {
                return (
                  <div key={user?.userId} className={cx('member')}>
                    <UserAvatar
                      thumbail="#5142aa"
                      medium
                      displayName={user.email}
                    />
                  </div>
                )
              })}
            </div>
            <button
              onClick={handleShowInviteModal}
              className={cx('board_header_invite_btn')}
            >
              <span className={cx('icon')}>
                <IoPersonAddOutline />
              </span>
              Invites
            </button>
          </div>
        </div>
      </div>

      {isOpen && <InviteModal setOpen={setOpen} center isOpen={isOpen} />}
    </>
  )
}

export default BoardHeader
