import React, { useState } from 'react'
import ModalOverlay from '../modal-overlay'
import styles from './card-modal.module.css'
import classNames from 'classnames/bind'
import { IoClose } from 'react-icons/io5'
import { CgCreditCard } from 'react-icons/cg'
import UserAvatar from '../../shared/user-avatar'
import { FaPlus } from 'react-icons/fa6'
import { TiDocumentText } from 'react-icons/ti'
import RichEditor from '../../rich-text-editor'
import { useNavigate } from 'react-router-dom'
import { RxActivityLog } from 'react-icons/rx'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlineNewLabel } from 'react-icons/md'
import { BsCardChecklist } from 'react-icons/bs'
import { BsCalendar2Date } from 'react-icons/bs'
import { PiSelectionBackgroundLight } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'
const cx = classNames.bind(styles)

const CardDetailModal = () => {
  const location = useLocation()
  const { titleCol, titleCard } = location.state
  const navigate = useNavigate()
  const [showEditor, setShowEditor] = useState(false)
  const handleCloseCardDetail = () => {
    navigate(-1)
  }
  const handlePreventCloseCard = e => {
    e.stopPropagation()
  }
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
                defaultValue={titleCard}
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
              <div className={cx('card_detail_item')}>
                <h3 className={cx('card_detail_header')}>Labels</h3>
                <div className={cx('card_detail_labels_container')}>
                  <span className={cx('card_detail_label_item')}>DONE</span>
                  <span className={cx('card_detail_label_item')}>DONE</span>
                  <span className={cx('card_detail_label_item')}>DONE</span>
                  <span className={cx('card_detail_label_item')}>DONE</span>
                  <span className={cx('card_detail_label_item')}>DONE</span>
                  <span className={cx('card_detail_label_item')}>DONE</span>
                </div>
              </div>
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
                    {showEditor ? (
                      <RichEditor handleShow={setShowEditor} />
                    ) : (
                      <div
                        className={cx('card_none_des')}
                        onClick={() => setShowEditor(true)}
                      >
                        Add a more detailed description...
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
              <ButtonAdd name="Labels" icon={<MdOutlineNewLabel />} />
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

const ButtonAdd = ({ icon, name }) => {
  return (
    <button className={cx('btn_add')}>
      <span className={cx('btn_add_icon')}> {icon}</span>
      {name}
    </button>
  )
}
