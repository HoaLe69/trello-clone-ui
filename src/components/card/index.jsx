import React from 'react'
import classNames from 'classnames/bind'
import styles from './card.module.css'

const cx = classNames.bind(styles)

const Card = ({ card }) => {
  const { _id, title, cover } = card
  return (
    <li className={cx('card')}>
      <div className={cx('card_inner')}>
        <p className={cx('card_title')}>{title}</p>
      </div>
    </li>
  )
}

export default Card
