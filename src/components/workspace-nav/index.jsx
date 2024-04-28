import React, { useEffect } from 'react'
import styles from './nav.module.css'
import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListWorkspaceUser } from '../../redux/api-client/workspace'
import { Link } from 'react-router-dom'
import WorkspaceLogo from '../workspace-logo'
import { IoChevronDownOutline } from 'react-icons/io5'
const cx = classNames.bind(styles)

const NavWorkspace = () => {
  const user = useSelector(state => state.auth.user)
  const workspaces = useSelector(state => state.workspace.list)
  const dispatch = useDispatch()
  const { userId } = user
  useEffect(() => {
    if (userId) {
      dispatch(fetchListWorkspaceUser(userId))
    }
  }, [userId, dispatch])
  return (
    <div className={cx('nav')}>
      <div className={cx('nav_main_title')}>Workspaces</div>
      <ul className={cx('nav_links')}>
        {workspaces.length > 0 &&
          workspaces.map(workspace => {
            const themeParse = JSON.parse(workspace.theme)
            return (
              <li className={cx('nav_link_wrap')} key={workspace.workSpaceId}>
                <Link
                  to={`/w/${workspace.workSpaceId}`}
                  className={cx('nav_link')}
                >
                  <WorkspaceLogo
                    small
                    theme={themeParse}
                    title={workspace.title}
                  />
                  <span className={cx('nav_link_title')}>
                    {workspace.title}
                  </span>
                  <span className={cx('nav_link_icon')}>
                    <IoChevronDownOutline />
                  </span>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default NavWorkspace
