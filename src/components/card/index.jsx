import React from 'react'
import classNames from 'classnames/bind'
import styles from './card.module.css'

const cx = classNames.bind(styles)

const Card = ({ card }) => {
  const { _id, title, cover } = card
  return (
    <li className={cx('card')}>
      <div className={cx('card_border')}>
        <div className={cx('card_inner')}>
          {cover && (
            <div
              className={cx('card_cover')}
              style={{ backgroundImage: `url(${cover})` }}
            ></div>
          )}
          <div className={cx('card_des')}>
            <div className={cx('card_label')}>
              <Label color="#e2b203">Doing</Label>
              <Label color="#f84462">Priority</Label>
              <Label color="#60c6d2">Trello Trip</Label>
            </div>
            <p className={cx('card_title')}>{title}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default Card

const Label = ({ children, color }) => {
  return (
    <div className={cx('label')} style={{ backgroundColor: `${color}` }}>
      <span className={cx('label_text')}>{children}</span>
    </div>
  )
}
