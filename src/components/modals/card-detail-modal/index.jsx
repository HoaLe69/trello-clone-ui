import React, { useRef, useState } from 'react'
import ModalOverlay from '../modal-overlay'
import styles from './card-modal.module.css'
import classNames from 'classnames/bind'
import { IoClose } from 'react-icons/io5'
import { CgCreditCard } from 'react-icons/cg'
import UserAvatar from '../../shared/user-avatar'
import { FaPlus } from 'react-icons/fa6'
import { TiDocumentText } from 'react-icons/ti'
import RichEditor from '../../rich-text-editor'
import { useNavigate, useParams } from 'react-router-dom'
import { RxActivityLog } from 'react-icons/rx'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineNewLabel } from 'react-icons/md'
import { BsCardChecklist } from 'react-icons/bs'
import { BsCalendar2Date } from 'react-icons/bs'
import { PiSelectionBackgroundLight } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'
import {
  UpdateInforCard,
  fetchCard,
  fetchListLabelInCard
} from '../../../redux/api-client/card'
import CreateLabelPopover from '../../popover/create-label-popover'
import { useLayer } from 'react-laag'
import { useSelector } from 'react-redux'
const cx = classNames.bind(styles)

const CardDetailModal = () => {
  const location = useLocation()
  const { titleCol, titleCard } = location.state
  const [textarea, setTextarea] = useState(titleCard)
  const token = useSelector(state => state.auth.token)
  const [showEditor, setShowEditor] = useState(false)
  const [labelCards, setLabelCards] = useState([])
  const [cardInfor, setCardInfor] = useState({})
  const { cardId } = useParams()
  const preTitle = useRef(textarea)
  const navigate = useNavigate()
  const handleCloseCardDetail = () => {
    navigate(-1)
  }
  const handlePreventCloseCard = e => {
    e.stopPropagation()
  }
  const handleBlur = async () => {
    if (!textarea.trim().length || preTitle.current === textarea) return
    if (!cardId) return
    const response = await UpdateInforCard(cardId, { title: textarea })
    if (response.status === 204) {
      console.log(response)
      preTitle.current = textarea
    }
  }
  useState(() => {
    const fetchCard = async () => {
      const res = await fetchListLabelInCard(cardId, token)
      if (res) {
        setLabelCards(res)
      }
    }
    if (cardId) {
      fetchCard()
    }
  }, [cardId])
  useState(() => {
    const fetchCardDetail = async () => {
      const res = await fetchCard(cardId, token)
      if (res) {
        const adjustRes = res.data
        // console.log(JSON.parse(adjustRes.description))
        if (adjustRes.description != null)
          adjustRes.description = JSON.parse(adjustRes.description)
        setCardInfor(adjustRes)
        setTextarea(adjustRes.title)
      }
    }
    if (cardId) {
      fetchCardDetail()
    }
  }, [cardId])
  return (
    <ModalOverlay onClick={handleCloseCardDetail} isOpen={true}>
      <div onClick={handlePreventCloseCard} className={cx('container')}>
        <div className={cx('inner')}>
          <button
            className={cx('card_close_btn')}
            onClick={handleCloseCardDetail}
          >
            <IoClose />
          </button>
          <div className={cx('card_header')}>
            <span className={cx('card_logo')}>
              <CgCreditCard />
            </span>
            <div className={cx('card_title')}>
              <textarea
                value={textarea}
                onBlur={handleBlur}
                onChange={e => setTextarea(e.target.value)}
                className={cx('card_title_input')}
              ></textarea>
            </div>
            <div className={cx('card_header_content')}>
              <p>
                in list <strong>{titleCol}</strong>
              </p>
            </div>
          </div>
          <div className={cx('card_main_col')}>
            <div className={cx('card_detail_gutter')}>
              <div className={cx('card_detail_item')}>
                <h3 className={cx('card_detail_header')}>Member</h3>
                <div className={cx('card_detail_member_list')}>
                  <button className={cx('card_detail_member_button')}>
                    <UserAvatar displayName="hoale" thumbail="#172b4d" medium />
                  </button>
                  <button className={cx('card_detail_add_button')}>
                    <FaPlus />
                  </button>
                </div>
              </div>
              {labelCards.length > 0 && (
                <div className={cx('card_detail_item')}>
                  <h3 className={cx('card_detail_header')}>Labels</h3>
                  <div className={cx('card_detail_labels_container')}>
                    {labelCards &&
                      labelCards.map(labelCard => {
                        const { label } = labelCard
                        return (
                          <span
                            key={label.labelId}
                            style={{ backgroundColor: label.theme }}
                            className={cx('card_detail_label_item')}
                          >
                            {label.labelName}
                          </span>
                        )
                      })}
                  </div>
                </div>
              )}
              <div className="ui-fixclean"></div>
            </div>
            <div className={cx('card_des')}>
              <div className={cx('card_des_inner')}>
                <div className={cx('card_des_header')}>
                  <span className={cx('card_des_icon')}>
                    <TiDocumentText />
                  </span>
                  <h3 style={{ fontWeight: 500 }}>Description</h3>
                </div>
                <div style={{ marginLeft: '40px' }}>
                  <div style={{ marginBotton: '8px' }}>
                    {showEditor && (
                      <RichEditor
                        setCardInfor={setCardInfor}
                        cardInfor={cardInfor}
                        handleShow={setShowEditor}
                      />
                    )}
                    {!showEditor && cardInfor?.description && (
                      <div onClick={() => setShowEditor(true)}>
                        <RichEditor cardInfor={cardInfor} render />
                      </div>
                    )}
                    {!showEditor && !cardInfor?.description && (
                      <div
                        className={cx('card_none_des')}
                        onClick={() => setShowEditor(true)}
                      >
                        Enter your description...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={cx('section_activity')}>
              <div className={cx('card_des_header')}>
                <span className={cx('card_des_icon')}>
                  <RxActivityLog />
                </span>
                <h3 style={{ fontWeight: 500 }}>Activity</h3>
              </div>
              <div className={cx('comment')}>
                <UserAvatar displayName="hoale" thumbail="#172b4d" medium />
                <input
                  className={cx('comment_input')}
                  placeholder="Write a comment...."
                />
              </div>
            </div>
          </div>
          <div className={cx('card_sidebar')}>
            <h3 className={cx('card_detail_header')}>Add to card</h3>
            <div>
              <ButtonAdd name="Members" icon={<FaRegUser />} />
              <GroupButton
                setLabelCards={setLabelCards}
                labelCards={labelCards}
              />
              <ButtonAdd name="Checklist" icon={<BsCardChecklist />} />
              <ButtonAdd name="Dates" icon={<BsCalendar2Date />} />
              <ButtonAdd name="Cover" icon={<PiSelectionBackgroundLight />} />
            </div>
          </div>
        </div>
      </div>
    </ModalOverlay>
  )
}

export default CardDetailModal

const ButtonAdd = ({ icon, name, onClick, triggerProps }) => {
  return (
    <button className={cx('btn_add')} {...triggerProps} onClick={onClick}>
      <span className={cx('btn_add_icon')}> {icon}</span>
      {name}
    </button>
  )
}
const GroupButton = ({ setLabelCards, labelCards }) => {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => {
    setIsOpen(false)
  }
  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    overflowContainer: false,
    auto: true,
    placement: 'bottom-end',
    triggerOffset: 12,
    containerOffset: 16,
    arrowOffset: 16
  })
  return (
    <>
      <ButtonAdd
        triggerProps={triggerProps}
        onClick={() => setIsOpen(!isOpen)}
        name="Labels"
        icon={<MdOutlineNewLabel />}
      />
      {renderLayer(
        isOpen && (
          <CreateLabelPopover
            setLabelCards={setLabelCards}
            labelInCard={labelCards}
            onClick={() => setIsOpen(!isOpen)}
            layerProps={layerProps}
          />
        )
      )}
    </>
  )
}
