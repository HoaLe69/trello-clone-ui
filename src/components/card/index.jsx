import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './card.module.css'
import { MdOutlineDescription } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const cx = classNames.bind(styles)

const Card = ({ isLink, card, titleCol }) => {
  const { cardId, title, cover } = card
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: cardId,
    data: {
      type: 'card'
    }
  })

  const DynamicLink = ({ children }) => {
    if (isLink) {
      return (
        <Link
          to={`c/${card.cardId}`}
          state={{ titleCol, titleCard: title }}
          className={cx('card_title')}
        >
          {children}
        </Link>
      )
    }
    return <span>{children}</span>
  }

  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate(`c/${card.cardId}`, { state: { titleCol, titleCard: title } })
  }
  return (
    <li
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? '0.5' : '1'
      }}
      className={cx('card')}
    >
      <div {...listeners} className={cx('card_border')}>
        <div className={cx('card_inner')}>
          {cover && (
            <div
              className={cx('card_cover')}
              style={{ backgroundImage: `url(${cover})` }}
            ></div>
          )}
          <div onClick={handleNavigate} className={cx('card_des')}>
            {/* <div className={cx('card_label')}> */}
            {/*   <Label color="#e2b203">Doing</Label> */}
            {/*   <Label color="#f84462">Priority</Label> */}
            {/*   <Label color="#60c6d2">Trello Trip</Label> */}
            {/* </div> */}
            <DynamicLink
              to={`c/${card.cardId}`}
              state={{ titleCol, titleCard: title }}
              className={cx('card_title')}
            >
              {title}
            </DynamicLink>
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
