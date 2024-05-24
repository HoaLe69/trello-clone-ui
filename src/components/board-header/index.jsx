import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'
import styles from './board-header.module.css'
import { LuListFilter } from 'react-icons/lu'
import { IoPersonAddOutline } from 'react-icons/io5'
import InviteModal from '../modals/invite-modal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchListUserBoard } from '../../redux/api-client/user'
import UserAvatar from '../shared/user-avatar'
import { UpdateBoardTitle } from '../../redux/api-client/board'

const cx = classNames.bind(styles)

const BoardHeader = ({ title }) => {
  const { id } = useParams()
  const [isOpen, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const refInputValue = useRef(title)
  const refInputEl = useRef()
  const handleShowInviteModal = () => {
    setOpen(true)
  }
  const listUserBoard = useSelector(state => state.user.fetchList.list)
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  useEffect(() => {
    if (id) {
      dispatch(fetchListUserBoard(id))
    }
  }, [id, dispatch])
  const handleOpenEditMode = () => {
    const _user = listUserBoard.find(
      userBoard => userBoard.userId === user.userId
    )
    if (_user.role === 1) return
    setEditMode(true)
    setTimeout(() => {
      const inputEl = refInputEl.current
      if (inputEl) {
        inputEl.select()
      }
    }, 0)
  }
  const handleBlur = async () => {
    setEditMode(false)
    if (
      inputValue.trim().length === 0 ||
      inputValue === refInputValue.current
    ) {
      setInputValue(refInputValue.current)
      return
    }
    // call api here
    const response = await UpdateBoardTitle(id, { title: inputValue })
    if (response.status === 204) {
      refInputValue.current = inputValue
    }
  }
  return (
    <>
      <div className={cx('board_header')}>
        <div className={cx('board_header_inner')}>
          <h2
            onClick={handleOpenEditMode}
            style={{ display: editMode ? 'none' : 'block' }}
            className={cx('board_header_name')}
          >
            {inputValue}
          </h2>
          {editMode && (
            <input
              ref={refInputEl}
              onChange={e => setInputValue(e.target.value)}
              onBlur={handleBlur}
              className={cx('input_edit')}
              value={inputValue}
            />
          )}
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
              {listUserBoard.length > 0 &&
                listUserBoard.map(userBoard => {
                  const { user } = userBoard
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
