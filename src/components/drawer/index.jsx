import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './drawer.module.css'
import { BsChevronLeft, BsThreeDots } from 'react-icons/bs'
import { HiOutlineViewBoards } from 'react-icons/hi'
import { FiPlus } from 'react-icons/fi'
import { FaChevronRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { fetchWorkspaceDetail } from '../../redux/api-client/workspace'
import WorkspaceLogo from '../workspace-logo'
import { ScaleLoader } from 'react-spinners'
import { Link } from 'react-router-dom'
import { transformString } from '../../utils'

const cx = classNames.bind(styles)

const Drawer = () => {
  const dispatch = useDispatch()
  const [isSlideIn, setIsSlideIn] = useState(false)
  const currentWorkspaceId = localStorage.getItem('current-workspace')
  const handleSlideInDrawer = useCallback(() => {
    setIsSlideIn(true)
  }, [])
  const handleSlideOutDrawer = useCallback(() => {
    setIsSlideIn(false)
  }, [])

  const detail = useSelector(state => state.workspace.detail.workspace)
  const status = useSelector(state => state.workspace.detail.status)
  const translate3d = isSlideIn
    ? 'translate3d(-100%,0,0)'
    : 'translate3d(0%,0,0)'

  useEffect(() => {
    if (currentWorkspaceId) {
      dispatch(fetchWorkspaceDetail(currentWorkspaceId))
    }
  }, [currentWorkspaceId, dispatch])

  return (
    <div
      className={cx('drawer_container')}
      style={{ width: `${isSlideIn ? '16px' : '260px'}` }}
    >
      <div
        className={cx('drawer_container_background')}
        style={{ transform: `${translate3d}` }}
      >
        {status === 'loading' || status === 'idle' ? (
          <div className={cx('drawer_loading')}>
            <ScaleLoader color="#ffffff" />
          </div>
        ) : (
          <>
            <div className={cx('drawer_header')}>
              <WorkspaceLogo
                medium
                theme={JSON.parse(detail.theme)}
                title={detail.title}
              />
              <Link
                to={`/w/${detail.workSpaceId}`}
                className={cx('drawer_header_link')}
              >
                {detail.title}
              </Link>
              <span
                className={cx('drawer_header_icon')}
                onClick={handleSlideInDrawer}
              >
                <BsChevronLeft />
              </span>
            </div>
            <div className={cx('drawer_body')}>
              <div className={cx('drawer_body_wrap_link')}>
                <a href="/" className={cx('drawer_body_link')}>
                  <span className={cx('drawer_body_icon')}>
                    <HiOutlineViewBoards style={{ fontSize: '1rem' }} />
                  </span>
                  <span className={cx('drawer_body_text')}>Boards</span>
                </a>
              </div>
              <div className={cx('drawer_body_project')}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                  Your board
                </span>
                <span
                  className={cx('drawer_body_icon', 'drawer_body_icon__right')}
                  style={{ marginLeft: 'auto' }}
                >
                  <FiPlus />
                </span>
              </div>
              <ul className={cx('drawer_body_project_list')}>
                {detail.boards.map(board => {
                  return (
                    <li
                      className={cx('drawer_body_project_item')}
                      key={board.boardId}
                    >
                      <Link
                        className={cx('drawer_body_link')}
                        to={`/b/${board.boardId}/${transformString(
                          board.title
                        )}`}
                      >
                        {board.title}
                      </Link>
                      <span
                        style={{ marginLeft: 'auto' }}
                        className={cx(
                          'drawer_body_icon',
                          'drawer_body_icon__right',
                          'drawer_body_icon__display'
                        )}
                      >
                        <BsThreeDots />
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </div>
      {isSlideIn && (
        <button
          onClick={handleSlideOutDrawer}
          className={cx('drawer_button_show')}
        >
          <span className={cx('drawer_button_icon')}>
            <FaChevronRight />
          </span>
        </button>
      )}
    </div>
  )
}

export default Drawer
