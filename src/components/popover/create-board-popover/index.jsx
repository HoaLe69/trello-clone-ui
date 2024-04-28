import Wrapper from '../wrapper'
import React, { useState } from 'react'
import Button from '../../shared/button'
import classNames from 'classnames/bind'
import styles from './create-board-popover.module.css'
import { IoMdCheckmark } from 'react-icons/io'

const cx = classNames.bind(styles)

const colorForm = [
  '#0079BF',
  '#D29034',
  '#519839',
  '#b04632',
  '#89609e',
  '#cd5a91',
  '#4bbf6b',
  '#00aecc',
  '#838c91',
  '#FFC83D'
]

const workSpaceValue = [
  'workspace 1',
  'workspace 2',
  'workspace 3',
  'workspace 4'
]

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

const CreateBoardPopover = ({ isOpen }) => {
  const [input, setInput] = useState('')
  const [selectOption, setSelectOption] = useState('')
  const [color, setColor] = useState('')
  const [selectedColorIndex, setSelectedColorIndex] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    console.log({
      title: input,
      workspace: selectOption,
      background: color
    })
  }

  return (
    <Wrapper isOpen={isOpen}>
      <form className={cx('form')} onSubmit={handleSubmit}>
        <span style={{ fontWeight: 'bold', color: 'GrayText' }}>
          Background
        </span>
        <div className={cx('color-row')}>
          {colorForm.map((color, index) => (
            <ColorButton
              onClick={() => {
                setSelectedColorIndex(index)
                setColor(color)
              }}
              key={index}
              color={color}
              selected={selectedColorIndex === index}
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
          {workSpaceValue.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
        <Button disable={!input.trim().length > 0}>Create</Button>
      </form>
    </Wrapper>
  )
}

export default CreateBoardPopover

/* 
  A: ['#0747a6', '#008da6'],
  B: ['#006644', '#00875a'],
  C: ['#403294', '#0747a6'],
  D: ['#b22865', '#cd5a91'],
  E: ['#cc4223', '#cb7d25'],
  F: ['#0747a6', '#008da6'],
  G: ['#006644', '#00875a'],
  H: ['#403294', '#0747a6'],
  I: ['#b22865', '#cd5a91'],
  J: ['#cc4223', '#cb7d25'],
  K: ['#0747a6', '#008da6'],
  L: ['#006644', '#00875a'],
  M: ['#403294', '#0747a6'],
  N: ['#b22865', '#cd5a91'],
  O: ['#cc4223', '#cb7d25'],
  P: ['#0747a6', '#008da6'],
  Q: ['#006644', '#00875a'],
  R: ['#403294', '#0747a6'],
  S: ['#b22865', '#cd5a91'],
  T: ['#cc4223', '#cb7d25'],
  U: ['#0747a6', '#008da6'],
  V: ['#006644', '#00875a'],
  W: ['#403294', '#0747a6'],
  X: ['#b22865', '#cd5a91'],
  Y: ['#cc4223', '#cb7d25'],
  Z: ['#0747a6', '#008da6']
*/
