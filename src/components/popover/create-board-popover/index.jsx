import Wrapper from '../wrapper'
import React, { useEffect, useState } from 'react'
import Button from '../../shared/button'
import classNames from 'classnames/bind'
import styles from './create-board-popover.module.css'
import { IoMdCheckmark } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { colorForm, transformString } from '../../../utils'
import { createBoard } from '../../../redux/api-client/board'
import { useNavigate } from 'react-router-dom'

const cx = classNames.bind(styles)

const ColorButton = ({ color, onClick, selected }) => {
  return (
    <div
      onClick={onClick}
      className={cx('colorButton')}
      style={{
        backgroundColor: color,
        width: '45px',
        position: 'relative'
      }}
    >
      {selected && (
        <IoMdCheckmark
          style={{
            color: 'white',
            fontSize: '20px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  )
}

const CreateBoardPopover = () => {
  const [input, setInput] = useState('')
  const [selectOption, setSelectOption] = useState('')
  const [colorPicked, setColorPicked] = useState('')
  const dispatch = useDispatch()
  const status = useSelector(state => state.board.create.status)
  const board = useSelector(state => state.board.create.board)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const boardData = {
      title: input,
      workSpaceId: selectOption,
      background: colorPicked
    }
    dispatch(createBoard(boardData))
  }
  useEffect(() => {
    if (status === 'succeeded')
      navigate(`/b/${board.boardId}/${transformString(board.title)}`)
  }, [status, board.boardId, navigate, board.title])
  const isOpen = useSelector(state => state.popover.isShowCreateBoardPopover)
  const workspaces = useSelector(state => state.workspace.list)
  return (
    <Wrapper isOpen={isOpen} direction="right" type="board">
      <form className={cx('form')} onSubmit={handleSubmit}>
        <span style={{ fontWeight: 'bold', color: 'GrayText' }}>
          Background
        </span>
        <div className={cx('color-row')}>
          {colorForm.map(color => (
            <ColorButton
              onClick={() => setColorPicked(color)}
              key={color}
              color={color}
              selected={colorPicked === color}
            />
          ))}
        </div>

        <span style={{ fontWeight: 'bold', color: 'GrayText' }}>
          Board title {''}
          <span style={{ color: 'red' }}>*</span>
        </span>
        <input
          type="text"
          className={cx('form-input-header')}
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <span style={{ fontWeight: 'bold', color: 'GrayText' }}>Workspace</span>
        <select
          value={selectOption}
          onChange={e => setSelectOption(e.target.value)}
          className={cx('form-input-header')}
        >
          {workspaces.map(workspace => (
            <option key={workspace.workSpaceId} value={workspace.workSpaceId}>
              {workspace.title}
            </option>
          ))}
        </select>
        <Button disable={!input.trim().length > 0 || status === 'loading'}>
          Create
        </Button>
      </form>
    </Wrapper>
  )
}

export default CreateBoardPopover
