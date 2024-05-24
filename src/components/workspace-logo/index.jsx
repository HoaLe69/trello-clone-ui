import styles from './workspace-logo.module.css'
import React from 'react'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const WorkspaceLogo = props => {
  const { medium, large, theme, title } = props
  return (
    <div
      style={{ backgroundImage: `linear-gradient(${theme[0]} , ${theme[1]})` }}
      className={cx('logo', { large }, { medium })}
    >
      {title.charAt(0).toUpperCase()}
    </div>
  )
}

export default WorkspaceLogo
