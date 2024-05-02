import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './column.module.css'
import { BsThreeDots } from 'react-icons/bs'
import AddCardButton from '../add-card-button'
import Card from '../card'
import { fetchListCards } from '../../redux/api-client/card'
import { updateTitle } from '../../redux/api-client/list'

const cx = classNames.bind(styles)

const Column = props => {
  const [cards, setCards] = useState([])
  const [newCard, setNewCard] = useState({})
  const { title, columnId } = props.column
  const [editMode, setEditMode] = useState(false)
  const [textarea, setTextarea] = useState(title)
  const refInput = useRef(null)
  const preTitle = useRef(title)

  useEffect(() => {
    const fetchList = async () => {
      const res = await fetchListCards(columnId)
      if (res.data) {
        setCards(res.data)
      }
    }
    if (columnId) {
      fetchList()
    }
  }, [columnId])

  useEffect(() => {
    if (newCard.title) {
      setCards(pre => [...pre, newCard])
    }
  }, [newCard])

  const handleOpenEditMode = useCallback(() => {
    setEditMode(true)
  }, [])

  const handleBlur = useCallback(async () => {
    setEditMode(false)
    if (!textarea.trim().length || textarea === preTitle.current) {
      setTextarea(preTitle.current)
      return
    }
    const response = await updateTitle(columnId, textarea)
    if (response.status === 204) {
      preTitle.current = textarea
    }
  }, [textarea, columnId])
  return (
    <li className={cx('column')}>
      <div className={cx('column_inner')}>
        <div className={cx('column_header')}>
          <div className={cx('column_header_wrap_name')}>
            <h2
              style={{ display: editMode ? 'none' : 'block' }}
              onClick={handleOpenEditMode}
              className={cx('column_header_name')}
            >
              {textarea}
            </h2>
            {editMode && (
              <textarea
                value={textarea}
                onChange={e => setTextarea(e.target.value)}
                autoFocus
                spellCheck="false"
                ref={refInput}
                name="title"
                onBlur={handleBlur}
                className={cx('column_edit_name')}
              ></textarea>
            )}
          </div>
          <button className={cx('column_header_btn')}>
            <BsThreeDots />
          </button>
        </div>
        <div style={{ height: '8px' }} />
        <ol className={cx('column_card_list')}>
          {cards.map(card => {
            return <Card key={card.cardId} card={card} />
          })}
          <AddCardButton listId={columnId} setNewCard={setNewCard} />
        </ol>
      </div>
    </li>
  )
}

export default Column
