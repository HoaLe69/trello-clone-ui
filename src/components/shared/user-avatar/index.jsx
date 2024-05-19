import React from 'react'
import classNames from 'classnames/bind'
import styles from './user-avatar.module.css'

const cx = classNames.bind(styles)

const UserAvatar = ({ thumbail, medium, small, displayName }) => {
  const isImage = thumbail.charAt(0) === 'h'
  return (
    <div className={cx('avatar', { medium }, { small })}>
      {isImage ? (
        <img src={thumbail} alt={displayName} className={cx('avatar_img')} />
      ) : (
        <div className={cx('avatar_no_img')} style={{ background: thumbail }}>
          {displayName.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  )
}

export default UserAvatar
