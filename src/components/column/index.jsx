import React, { useCallback, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './column.module.css'
import { BsThreeDots } from 'react-icons/bs'
import AddCardButton from '../add-card-button'
import Card from '../card'
import { fetchListCards } from '../../redux/api-client/card'
import { updateTitle } from '../../redux/api-client/list'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, defaultAnimateLayoutChanges } from '@dnd-kit/sortable'
import { mapOrder } from '../../utils'

const cx = classNames.bind(styles)

const Column = ({
  column,
  containers,
  setContainers,
  noEffect,
  orderCardIds
}) => {
  const [newCard, setNewCard] = useState({})
  const { title, columnId } = column
  const [editMode, setEditMode] = useState(false)
  const [textarea, setTextarea] = useState(title)
  const refInput = useRef(null)
  const preTitle = useRef(title)

  const animateLayoutChanges = args =>
    defaultAnimateLayoutChanges({ ...args, wasDragging: true })
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: columnId,
    data: {
      type: 'list'
    },
    animateLayoutChanges
  })
  const findListById = () => {
    return containers.find(container => container.columnId === columnId)
  }
  useEffect(() => {
    const fetchList = async () => {
      const res = await fetchListCards(columnId)
      if (res.data) {
        const container = findListById()
        if (!container) return
        container.cards = [...res.data]
        if (orderCardIds) {
          container.cards = mapOrder(
            container.cards,
            JSON.parse(orderCardIds),
            'cardId'
          )
        }
        setContainers([...containers])
      }
    }
    if (columnId && !noEffect) {
      fetchList()
    }
  }, [])

  useEffect(() => {
    if (newCard.title) {
      const container = findListById()
      if (!container) return
      container.cards = [...container.cards, newCard]
      setContainers([...containers])
    }
  }, [newCard])

  const handleOpenEditMode = useCallback(() => {
    setEditMode(true)
    setTimeout(() => {
      const refEl = refInput.current
      if (refEl) {
        refEl.select()
      }
    }, 0)
  }, [refInput])

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
    <li
      className={cx('column')}
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? '0.5' : '1'
      }}
    >
      <div className={cx('column_inner')}>
        <div className={cx('column_header')} {...listeners}>
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
          <SortableContext items={column.cards.map(card => card.cardId)}>
            {column.cards.map(card => {
              return (
                <Card key={card.cardId} titleCol={title} isLink card={card} />
              )
            })}
          </SortableContext>
          <AddCardButton listId={columnId} setNewCard={setNewCard} />
        </ol>
      </div>
    </li>
  )
}

export default Column
