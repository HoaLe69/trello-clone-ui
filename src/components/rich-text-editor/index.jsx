import React, { useState, useCallback, useMemo } from 'react'
import {
  createEditor,
  Transforms,
  Editor,
  Element as SlateElement
} from 'slate'
import { Slate, Editable, withReact, useSlate } from 'slate-react'
import { FaBold } from 'react-icons/fa'
import { FaItalic, FaListOl, FaListUl } from 'react-icons/fa6'
import { GoStrikethrough } from 'react-icons/go'
import { MdOutlineFormatUnderlined } from 'react-icons/md'
import { LuHeading1 } from 'react-icons/lu'
import classNames from 'classnames/bind'
import styles from './rich-editor.module.css'
import { UpdateInforCard } from '../../redux/api-client/card'
import { useParams } from 'react-router-dom'
const cx = classNames.bind(styles)

const LIST_TYPES = ['numbered-list', 'bulleted-list']
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify']

const CustomEditor = {
  moveToEnd(editor) {
    Transforms.select(editor, Editor.end(editor, []))
  },
  isMarkActive(editor, format) {
    const marks = Editor.marks(editor)
    return marks ? marks[format] === true : false
  },

  isBlockActive(editor, format, blockType = 'type') {
    const { selection } = editor
    if (!selection) return false
    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format
      })
    )
    return !!match
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format)
    if (isActive) {
      Editor.removeMark(editor, format)
    } else {
      Editor.addMark(editor, format, true)
    }
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(
      editor,
      format,
      TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
    )
    const isList = LIST_TYPES.includes(format)

    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type) &&
        !TEXT_ALIGN_TYPES.includes(format),
      split: true
    })
    let newProperties
    if (TEXT_ALIGN_TYPES.includes(format)) {
      newProperties = {
        align: isActive ? undefined : format
      }
    } else {
      newProperties = {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format
      }
    }
    Transforms.setNodes(editor, newProperties)

    if (!isActive && isList) {
      const block = { type: format, children: [] }
      Transforms.wrapNodes(editor, block)
    }
  }
}
const fallbackValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
]

const RichEditor = ({ handleShow, setCardInfor, cardInfor, render }) => {
  const [forcusOnEditor, setForcusOnEditor] = useState(false)
  const [editor] = useState(() => withReact(createEditor()))
  const [editorValue, setEditorValue] = useState()
  const { cardId } = useParams()
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(props => <Element {...props} />, [])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const handleSave = async () => {
    if (!editorValue || !cardId) return
    const res = await UpdateInforCard(cardId, {
      description: JSON.stringify(editorValue)
    })
    if (res.status === 204) {
      setCardInfor(pre => {
        const newCardInfor = pre
        newCardInfor.description = editorValue
        return newCardInfor
      })
      handleShow(false)
    }
  }
  return (
    <>
      <div
        className={cx('rich_editor', { render }, { outline: forcusOnEditor })}
      >
        <Slate
          editor={editor}
          initialValue={cardInfor?.description || fallbackValue}
          onChange={value => {
            const isAstChange = editor.operations.some(
              op => 'set_selection' !== op.type
            )
            if (isAstChange) {
              setEditorValue(value)
            }
          }}
        >
          <div
            style={{ display: render ? 'none' : 'flex' }}
            className={cx('toolbar')}
            onClick={() => {
              if (!forcusOnEditor) return
              setForcusOnEditor(false)
            }}
          >
            <MarkButton format="bold" icon={<FaBold />} />
            <MarkButton format="italic" icon={<FaItalic />} />
            <MarkButton format="strikethrough" icon={<GoStrikethrough />} />
            <MarkButton
              format="underline"
              icon={<MdOutlineFormatUnderlined />}
            />
            <BlockButton format="heading-one" icon={<LuHeading1 />} />
            <BlockButton format="numbered-list" icon={<FaListOl />} />
            <BlockButton format="bulleted-list" icon={<FaListUl />} />
          </div>
          <div
            style={{ flex: 1, backgroundColor: render ? '#091e420f' : '#fff' }}
            onClick={e => {
              e.preventDefault()
              if (render) return
              if (forcusOnEditor) return
              setForcusOnEditor(true)
              CustomEditor.moveToEnd(editor)
            }}
          >
            <div className={cx('edit_area')}>
              <Editable
                placeholder="Enter your description..."
                style={{ outline: 'none' }}
                onFocus={() => {
                  if (render) return
                  setForcusOnEditor(true)
                  CustomEditor.moveToEnd(editor)
                }}
                spellCheck={false}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                  if (!event.ctrlKey) {
                    return
                  }
                  switch (event.key) {
                    case '`': {
                      event.preventDefault()
                      CustomEditor.toggleCodeBlock(editor)
                      break
                    }

                    case 'b': {
                      event.preventDefault()
                      CustomEditor.toggleBoldMark(editor)
                      break
                    }
                    case '1': {
                      break
                    }
                    default:
                      return
                  }
                }}
              />
            </div>
          </div>
        </Slate>
      </div>
      <div
        className={cx('button_actions')}
        style={{ display: render ? 'none' : 'flex' }}
      >
        <button className={cx('btn', 'btn_save')} onClick={handleSave}>
          Save
        </button>
        <button className={cx('btn')} onClick={() => handleShow(false)}>
          Cancel
        </button>
      </div>
    </>
  )
}
export default RichEditor

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'heading-one':
      return (
        <h1 style={{ fontSize: '20px' }} {...attributes}>
          {children}
        </h1>
      )
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'bulleted-list':
      return (
        <ul style={{ paddingLeft: '24px' }} {...attributes}>
          {children}
        </ul>
      )
    case 'list-item':
      return <li {...attributes}>{children}</li>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.code) {
    children = <code>{children}</code>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }
  if (leaf.underline) {
    children = <u>{children}</u>
  }
  if (leaf.strikethrough) {
    children = <del>{children}</del>
  }
  return <span {...attributes}>{children}</span>
}
const BlockButton = ({ format, icon }) => {
  const editor = useSlate()

  return (
    <button
      className={cx('mark_btn')}
      onClick={e => {
        e.preventDefault()
        CustomEditor.toggleBlock(editor, format)
      }}
    >
      {icon}
    </button>
  )
}
const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  const active = CustomEditor.isMarkActive(editor, format)
  return (
    <button
      className={cx('mark_btn')}
      onClick={e => {
        e.preventDefault()
        CustomEditor.toggleMark(editor, format)
      }}
      style={{ background: active ? 'rgba(0,0,0,.2)' : 'none' }}
    >
      {icon}
    </button>
  )
}
