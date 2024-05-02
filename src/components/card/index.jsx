import React from 'react'
import classNames from 'classnames/bind'
import styles from './card.module.css'
import { MdOutlineDescription } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'

const cx = classNames.bind(styles)

const Card = ({ card }) => {
  const { title, cover } = card
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
            {/* <div className={cx('card_label')}> */}
            {/*   <Label color="#e2b203">Doing</Label> */}
            {/*   <Label color="#f84462">Priority</Label> */}
            {/*   <Label color="#60c6d2">Trello Trip</Label> */}
            {/* </div> */}
            <p className={cx('card_title')}>{title}</p>
            <div className={cx('card_bages_container')}>
              {/* <div className={cx('card_des_bages')}> */}
              {/*   <span className={cx('card_des_bages_icon')}> */}
              {/*     <MdOutlineDescription /> */}
              {/*   </span> */}
              {/*   <div className={cx('card_bages_icon_container')}> */}
              {/*     <span className={cx('card_des_bages_icon')}> */}
              {/*       <FaRegComment /> */}
              {/*     </span> */}
              {/*     <span className={cx('card_des_bages_quatity')}>3</span> */}
              {/*   </div> */}
              {/* </div> */}
              {/* <div className={cx('card_des_member')}> */}
              {/*   <span className={cx('card_member_item')}> */}
              {/*     <img */}
              {/*       src="https://trello-members.s3.amazonaws.com/65faedd37fd77eeff6fe973b/fabb17b9377e04034f3c619d84103425/170.png" */}
              {/*       alt="member" */}
              {/*     /> */}
              {/*   </span> */}
              {/*   <span className={cx('card_member_item')}> */}
              {/*     <img */}
              {/*       src="https://trello-members.s3.amazonaws.com/65faedd37fd77eeff6fe973b/fabb17b9377e04034f3c619d84103425/170.png" */}
              {/*       alt="member" */}
              {/*     /> */}
              {/*   </span> */}
              {/*   <span className={cx('card_member_item')}> */}
              {/*     <img */}
              {/*       src="https://trello-members.s3.amazonaws.com/65faedd37fd77eeff6fe973b/fabb17b9377e04034f3c619d84103425/170.png" */}
              {/*       alt="member" */}
              {/*     /> */}
              {/*   </span> */}
              {/* </div> */}
            </div>
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
