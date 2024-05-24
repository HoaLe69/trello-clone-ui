import React, { useEffect } from 'react'
import styles from './nav.module.css'
import classNames from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListWorkspaceUser } from '../../redux/api-client/workspace'
import { Link, useLocation } from 'react-router-dom'
import WorkspaceLogo from '../workspace-logo'
import { IoChevronDownOutline } from 'react-icons/io5'
import { FaTrello } from 'react-icons/fa6'
const cx = classNames.bind(styles)

const NavWorkspace = () => {
  const user = useSelector(state => state.auth.user)
  const workspaces = useSelector(state => state.workspace.fetchList.list)
  const dispatch = useDispatch()
  const { userId } = user
  useEffect(() => {
    if (userId) {
      dispatch(fetchListWorkspaceUser(userId))
    }
  }, [userId, dispatch])
  const { pathname } = useLocation()
  return (
    <div className={cx('nav')}>
      <Link
        className={cx('nav_link', { nav_active: pathname === '/workspace' })}
        to="/workspace"
      >
        <FaTrello />
        <div>Boards</div>
      </Link>
      <hr />
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
