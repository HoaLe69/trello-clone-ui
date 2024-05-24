import React, { useEffect, useState } from 'react'
import styles from './poperver.module.css'
import classNames from 'classnames/bind'
import { IoChevronBack, IoClose } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import {
  AddlabelToCard,
  RemoveLabelToCard,
  createLabel,
  fetchListLabel
} from '../../redux/api-client/label'
import { useParams } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
const cx = classNames.bind(styles)
const listColor = [
  '#7ee2b8',
  '#7f5f01',
  '#a54800',
  '#ae2e24',
  '#5e4db2',
  '#85b8ff',
  '#9dd9ee',
  '#b3df72',
  '#f797d2',
  '#943d73'
]
const CreateLabelPopover = ({
  layerProps,
  onClick,
  setLabelCards,
  labelInCard
}) => {
  const [switchView, setSwitchView] = useState(false)
  const [colorPicked, setColorPicked] = useState('#94c748')
  const [labels, setLabels] = useState([])
  const [titleLabel, setTitleLabel] = useState('')
  const { id, cardId } = useParams()
  const handleSubmit = async () => {
    const data = {
      theme: colorPicked,
      labelName: titleLabel,
      boardId: id
    }
    if (!data.theme || !data.labelName || !data.boardId) return
    const res = await createLabel(data)
    if (res.message === 'created') {
      setSwitchView(false)
    }
  }
  useEffect(() => {
    const fetchListLabelByBoardId = async () => {
      const res = await fetchListLabel(id)
      if (res.data) {
        setLabels(res.data)
      }
    }
    if (id) {
      fetchListLabelByBoardId()
    }
  }, [id, switchView])
  const handleAddLabelToCard = async labelId => {
    if (cardId && labelId) {
      const res = await AddlabelToCard(cardId, labelId)
      if (res) {
        setLabelCards(pre => [
          ...pre,
          { cardId, labelId, label: { ...res.data } }
        ])
      }
    }
  }
  const handleRemoveLabelToCard = async labelId => {
    if (cardId && labelId) {
      const res = await RemoveLabelToCard(cardId, labelId)
      if (res.status === 204) {
        let newLabelInCard = [...labelInCard].filter(
          card => card.labelId !== labelId
        )
        setLabelCards(newLabelInCard)
      }
    }
  }
  return (
    <div className={cx('wrap')} {...layerProps}>
      <header className={cx('header')}>
        <span
          style={{ opacity: switchView ? '1' : '0' }}
          onClick={() => setSwitchView(false)}
          className={cx('header_btn_icon')}
        >
          <IoChevronBack />
        </span>
        <span>{switchView ? 'Create Label' : 'Label'}</span>
        <span className={cx('header_btn_icon')} onClick={onClick}>
          <IoClose />
        </span>
      </header>
      <div className={cx('body')}>
        {switchView ? (
          <>
            <div className={cx('preview')}>
              <div
                style={{ backgroundColor: colorPicked }}
                className={cx('color')}
              />
            </div>
            <label className={cx('title_section')}>Title</label>
            <input
              value={titleLabel}
              onChange={e => setTitleLabel(e.target.value)}
              className={cx('label_input')}
              placeholder="Enter your label name..."
              name="title"
            />
            <span className={cx('title_section')}>Select a color</span>
            <div className={cx('color_pick')}>
              {listColor.map(color => (
                <div
                  onClick={() => setColorPicked(color)}
                  className={cx('color_item', {
                    active: color === colorPicked
                  })}
                  key={color}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <button onClick={handleSubmit} className={cx('btn_create')}>
              Create
            </button>
          </>
        ) : (
          <div>
            <span className={cx('title_section')}>Labels</span>
            <ul className={cx('list_label')}>
              {labels.map(label => {
                const isExitInCard = labelInCard.some(
                  card => card.labelId === label.labelId
                )
                return (
                  <li key={label.labelId} className={cx('select_label_item')}>
                    <span
                      className={cx('select_label_color')}
                      style={{ backgroundColor: label.theme }}
                    >
                      {label.labelName}
                    </span>
                    {isExitInCard ? (
                      <span
                        onClick={() => handleRemoveLabelToCard(label.labelId)}
                        className={cx('select_label_add')}
                      >
                        <FaCheck />
                      </span>
                    ) : (
                      <span
                        onClick={() => handleAddLabelToCard(label.labelId)}
                        className={cx('select_label_add')}
                      >
                        <FaPlus />
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
            <button
              className={cx('btn_switch')}
              onClick={() => setSwitchView(true)}
            >
              Create new label
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
const WraperStyle = {}
export default CreateLabelPopover
