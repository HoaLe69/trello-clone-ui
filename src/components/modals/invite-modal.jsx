import React, { useEffect, useState } from 'react'
import ModalOverlay from './modal-overlay'
import classNames from 'classnames/bind'
import styles from './modal.module.css'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from '../../hook/useDebounce'
import { addUserToBoard, search } from '../../redux/api-client/user'
import UserAvatar from '../shared/user-avatar'
import { SyncLoader } from 'react-spinners'
import { useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

const InviteModal = ({ isOpen, center, setOpen }) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const [clickOutSide, setClickOutSide] = useState(false)
  const [userSelected, setUserSelected] = useState(null)
  const searchResutl = useSelector(state => state.user.search.res)
  const status = useSelector(state => state.user.search.status)
  const debounceValue = useDebounce(input, 300)
  const { id } = useParams()
  const handleClickOutside = () => {
    setOpen(false)
  }
  useEffect(() => {
    if (!debounceValue) return
    dispatch(search(debounceValue))
  }, [debounceValue, dispatch])
  const showSearchResult = debounceValue?.length > 0 && clickOutSide === false
  const handleSelectUser = user => {
    setUserSelected(user)
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (id && userSelected.userId) {
      dispatch(addUserToBoard({ userId: userSelected.userId, boardId: id }))
    }
    setOpen(false)
  }
  return (
    <ModalOverlay onClick={handleClickOutside} isOpen={isOpen} center={center}>
      <div
        className={cx('invite_modal')}
        onClick={e => {
          e.stopPropagation()
          setClickOutSide(true)
        }}
      >
        <div className={cx('header')}>
          <p>Share board</p>
          <span style={{ cursor: 'pointer' }} onClick={() => setOpen(false)}>
            <IoMdClose />
          </span>
        </div>
        <form onSubmit={handleSubmit} className={cx('invite_form')}>
          <div onClick={e => e.stopPropagation()} className={cx('input_wrap')}>
            {userSelected && (
              <div className={cx('user_selected')}>
                {userSelected.email}
                <span onClick={() => setUserSelected(null)}>
                  <IoMdClose />
                </span>
              </div>
            )}
            <input
              name="email"
              onChange={e => setInput(e.target.value)}
              className={cx('form_input')}
              placeholder="Email address ..."
              autoComplete="off"
              value={input}
              onFocus={() => setClickOutSide(false)}
            />
            {showSearchResult && (
              <div className={cx('search_result')}>
                <div className={cx('search_result_inner')}>
                  {status === 'succeeded' ? (
                    <ul className={cx('list_user')}>
                      {searchResutl.map(user => {
                        return (
                          <li
                            onClick={() => handleSelectUser(user)}
                            className={cx('user_item')}
                            key={user.userId}
                          >
                            <UserAvatar
                              thumbail="#5142aa"
                              medium
                              displayName={user.email}
                            />
                            {user.email}
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className={cx('loading')}>
                      <SyncLoader color="rgba(0,0,0,0.3)" />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <button className={cx('submit_btn')}>Share</button>
        </form>
      </div>
    </ModalOverlay>
  )
}

export default InviteModal
