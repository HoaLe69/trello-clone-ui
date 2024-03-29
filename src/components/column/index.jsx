import React from 'react'
import classNames from 'classnames/bind'
import styles from './column.module.css'
import { BsThreeDots } from 'react-icons/bs'
import AddCardButton from '../add-card-button'
import Card from '../card'

const cx = classNames.bind(styles)

const Column = ({ column }) => {
  const { _id, title, cardOrderIds, cards } = column

  return (
    <li className={cx('column')}>
      <div className={cx('column_inner')}>
        <div className={cx('column_header')}>
          <div className={cx('column_header_wrap_name')}>
            <h2 className={cx('column_header_name')}>{title}</h2>
          </div>
          <button className={cx('column_header_btn')}>
            <BsThreeDots />
          </button>
        </div>
        <ol className={cx('column_card_list')}>
          {cards.map(card => {
            return <Card key={card._id} card={card} />
          })}
        </ol>
        <div>
          <AddCardButton />
        </div>
      </div>
    </li>
  )
}

export default Column
