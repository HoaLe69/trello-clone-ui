import Wrapper from './wrapper'
import styles from './poperver.module.css'
import React from 'react'
import classNames from 'classnames/bind'
import NoStar from '../../assets/image/nostar.png'

const cx = classNames.bind(styles)

const StarredListPopover = ({ isOpen }) => {
  return (
    <Wrapper isOpen={isOpen}>
      <div className={cx('img_wrap')}>
        <img className={cx('empty_list_img')} src={NoStar} alt="no star" />
      </div>
      <p className={cx('popover_empty_text')}>
        Star important boards to access them quickly and easily
      </p>
    </Wrapper>
  )
}

export default StarredListPopover
