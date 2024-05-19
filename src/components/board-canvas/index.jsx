import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './board-canvas.module.css'
import Column from '../column'
import ButtonAddList from '../button-add-list'
import { useSelector } from 'react-redux'
//Dnd
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  closestCorners
} from '@dnd-kit/core'

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import Card from '../card'

class Container {
  constructor(list) {
    this.columnId = list.columnId
    this.title = list.title
    this.cards = []
  }
}

const cx = classNames.bind(styles)

const BoardCanvas = props => {
  const { columns } = props
  const [containers, setContainers] = useState(() => {
    return columns.map(list => new Container(list))
  })
  const newCol = useSelector(state => state.list.create.list)
  const [activeEl, setActive] = useState()

  useEffect(() => {
    if (newCol.columnId) {
      setContainers(pre => [...pre, new Container(newCol)])
    }
  }, [newCol.columnId])

  const findListActive = (type, id) => {
    if (type === 'list') {
      return containers.find(container => container.columnId === id)
    }
    if (type === 'card')
      return containers.find(container =>
        container.cards.find(item => item.cardId === id)
      )
  }
  const findCardActive = id => {
    const listActive = findListActive('card', id)
    if (!listActive) return
    return listActive.cards.find(item => item.cardId === id)
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  const handleDragStart = event => {
    const { active } = event
    setActive(active)
  }
  const handleDragEnd = event => {
    const { active, over } = event
    if (!over) return
    const activeType = active.data.current.type === 'card'
    const overType = over.data.current.type === 'card'
    const notSame = active?.id !== over?.id
    //handling sorting list
    if (notSame && !activeType && !overType && over && active) {
      const activeContainerIndex = containers.findIndex(
        container => container.columnId === active.id
      )

      const overContainerIndex = containers.findIndex(
        container => container.columnId === over.id
      )

      let newItems = [...containers]
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex)
      setContainers(newItems)
    }
    // handling sorting card
    if (notSame && activeType && overType) {
      // find active and over container
      const activeContainer = findListActive('card', active.id)
      const overContainer = findListActive('card', over.id)
      if (!activeContainer || !overContainer) return

      // find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        container => container.columnId === activeContainer.columnId
      )
      const overContainerIndex = containers.findIndex(
        container => container.columnId === overContainer.columnId
      )
      // find the index of the active and over item
      const activeItemIndex = activeContainer.cards.findIndex(
        card => card.cardId === active.id
      )
      const overItemIndex = overContainer.cards.findIndex(
        card => card.cardId === over.id
      )
      // in the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers]
        newItems[activeContainerIndex].cards = arrayMove(
          newItems[activeContainerIndex].cards,
          activeItemIndex,
          overItemIndex
        )
        setContainers(newItems)
      } else {
        // in different container
        let newItems = [...containers]
        const [removedItem] = newItems[activeContainerIndex].cards.splice(
          activeItemIndex,
          1
        )
        newItems[overContainerIndex].cards.splice(overItemIndex, 0, removedItem)
        setContainers(newItems)
      }
    }
    // handling drop card into list
    if (activeType && !overType && notSame && over && active) {
      // find the acttive and over container
      const activeContainer = findListActive('card', active.id)
      const overContainer = findListActive('list', over.id)

      if (!activeContainer || !overContainer) return

      // find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        container => container.columnId === activeContainer.columnId
      )
      const overContainerIndex = containers.findIndex(
        container => container.columnId === overContainer.columnId
      )
      // find the index of the active item
      const activeItemIndex = activeContainer.cards.findIndex(
        card => card.cardId === active.id
      )

      let newItems = [...containers]
      const [removedCard] = newItems[activeContainerIndex].cards.splice(
        activeItemIndex,
        1
      )
      newItems[overContainerIndex].cards.push(removedCard)
      setContainers(newItems)
    }
    setActive(null)
  }
  return (
    <div className={cx('board_canvas')}>
      <ol id="board" className={cx('board')}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={containers.map(col => col.columnId)}>
            {containers.map(col => {
              return (
                <Column
                  containers={containers}
                  setContainers={setContainers}
                  column={col}
                  key={col.columnId}
                />
              )
            })}
          </SortableContext>
          <DragOverlay>
            {/*for card*/}
            {activeEl && activeEl?.data?.current?.type === 'card' && (
              <Card card={findCardActive(activeEl?.id)} />
            )}
            {/* for list */}
            {activeEl && activeEl?.data?.current?.type === 'list' && (
              <Column
                noEffect
                containers={containers}
                setContainers={setContainers}
                column={findListActive('list', activeEl?.id)}
              />
            )}
          </DragOverlay>
        </DndContext>
        <ButtonAddList />
      </ol>
    </div>
  )
}

export default BoardCanvas
