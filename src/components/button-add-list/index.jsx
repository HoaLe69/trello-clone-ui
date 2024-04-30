import classNames from 'classnames/bind'
import React, { useCallback, useRef, useState } from 'react'
import styles from './button-add-list.module.css'
import { FaPlus } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createList } from '../../redux/api-client/list'

const cx = classNames.bind(styles)

const ButtonAddList = () => {
  const [showForm, setShowForm] = useState(false)
  const [textarea, setTextarea] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const refTextarea = useRef(null)
  const handleCancel = e => {
    e.preventDefault()
    setShowForm(false)
  }
  const handleOpenForm = useCallback(() => {
    setShowForm(true)
  }, [])
  const handleSubmit = e => {
    e.preventDefault()
    if (textarea.trim().length > 0) {
      dispatch(createList({ title: textarea, boardId: id }))
    }
  }
  return (
    <div className={cx('button_container')}>
      {showForm ? (
        <form className={cx('form', 'common')}>
          <textarea
            ref={refTextarea}
            placeholder="Enter list title..."
            name="title"
            className={cx('form_input')}
            spellCheck="false"
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
          ></textarea>
          <div className={cx('form_buttons')}>
            <button
              onClick={handleSubmit}
              className={cx('button_submit', 'button')}
              type="submit"
            >
              Add list
            </button>
            <button
              onClick={handleCancel}
              className={cx('button_cancel', 'button')}
            >
              <MdClose />
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={handleOpenForm}
          className={cx('button_switch', 'common')}
        >
          <span className={cx('button_icon')}>
            <FaPlus />
          </span>
          Add a list
        </button>
      )}
    </div>
  )
}

export default ButtonAddList
