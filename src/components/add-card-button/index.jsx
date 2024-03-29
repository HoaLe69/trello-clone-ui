import React, { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './add-card-button.module.css'
import { FiPlus } from 'react-icons/fi'
import { LiaTimesSolid } from 'react-icons/lia'

const cx = classNames.bind(styles)

const AddCardButton = () => {
  const [isForm, setIsForm] = useState(false)
  const handleCancelAdd = e => {
    e.preventDefault()
    setIsForm(false)
  }
  return (
    <div className={cx('add_card_container')}>
      {isForm ? (
        <form className={cx('form')}>
          <textarea
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
