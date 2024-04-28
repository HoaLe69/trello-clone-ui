import React, { useEffect, useState } from 'react'
import styles from './workspace-top.module.css'
import classNames from 'classnames/bind'
import { IoPersonAddOutline } from 'react-icons/io5'
import WorkspaceLogo from '../workspace-logo'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const cx = classNames.bind(styles)

const WorkspaceTop = () => {
  const [currentWorkspace, setCurrentWorkspace] = useState()
  const workspaces = useSelector(state => state.workspace.list)
  const { id } = useParams()
  useEffect(() => {
    if (id) {
      const curr = workspaces.find(e => e.workSpaceId === id)
      if (curr) setCurrentWorkspace(curr)
    }
  }, [id, workspaces])
  return (
    <div className={cx('workspace_top')}>
      <div className={cx('workspace_top_logo')}>
        {currentWorkspace && (
          <WorkspaceLogo
            theme={JSON.parse(currentWorkspace.theme)}
            title={currentWorkspace.title}
            large
          />
        )}
        <div className={cx('logo_name_wrap')}>
          {currentWorkspace && (
            <h3 className={cx('logo_name')}>{currentWorkspace?.title}</h3>
          )}
        </div>
      </div>
      <button className={cx('btn_invite')}>
        <IoPersonAddOutline /> Invite Workspace members
      </button>
    </div>
  )
}

export default WorkspaceTop
