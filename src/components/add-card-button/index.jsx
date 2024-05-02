import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './add-card-button.module.css'
import { FiPlus } from 'react-icons/fi'
import { LiaTimesSolid } from 'react-icons/lia'
import { addNewCard } from '../../redux/api-client/card'

const cx = classNames.bind(styles)

const AddCardButton = ({ listId, setNewCard }) => {
  const [isForm, setIsForm] = useState(false)
  const [textarea, setTextarea] = useState('')
  const handleCancelAdd = e => {
    e.preventDefault()
    setIsForm(false)
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if (textarea.length === 0) return
    const res = await addNewCard({ title: textarea, columnId: listId })
    if (res.data) {
      setNewCard(res.data)
      setIsForm(false)
      setTextarea('')
    }
  }
  return (
    <div className={cx('add_card_container')}>
      {isForm ? (
        <form onSubmit={handleSubmit} className={cx('form')}>
          <textarea
            value={textarea}
            onChange={e => setTextarea(e.target.value)}
            className={cx('form_input')}
            placeholder="Enter a title for this card..."
            name="content"
          ></textarea>
          <div className={cx('form_btn')}>
            <button className={cx('submit_btn', 'btn')}>Add card</button>
            <button
              onClick={handleCancelAdd}
              className={cx('cancel_btn', 'btn')}
            >
              <LiaTimesSolid />
            </button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsForm(true)} className={cx('button')}>
          <span className={cx('button_icon')}>
            <FiPlus />
          </span>
          Add a card
        </button>
      )}
    </div>
  )
}

export default AddCardButton
