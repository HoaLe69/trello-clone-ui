import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './board-canvas.module.css'
import Column from '../column'
import ButtonAddList from '../button-add-list'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateCardsOrder, ChangeListOfCard } from '../../redux/api-client/card'
//Dnd
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensors,
  useSensor,
  closestCorners,
  closestCenter,
  rectIntersection
} from '@dnd-kit/core'

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import Card from '../card'
import { useParams } from 'react-router-dom'
import { UpdateColumnOrder } from '../../redux/api-client/board'
import { mapOrder } from '../../utils'

class Container {
  constructor(list) {
    this.columnId = list.columnId
    this.title = list.title
    this.orderCardIds = list.orderCardIds
    this.cards = []
  }
}

const cx = classNames.bind(styles)
const BoardCanvas = props => {
  const { columns, orderColumn } = props
  const [containers, setContainers] = useState(() => {
    let newList = columns
    if (orderColumn) {
      newList = mapOrder(columns, JSON.parse(orderColumn), 'columnId')
    }
    return newList.map(list => new Container(list))
  })
  const { id } = useParams()
  const dispatch = useDispatch()
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
        distance: 2
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
  const handleDragEnd = async event => {
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
      dispatch(
        UpdateColumnOrder({
          boardId: id,
          body: {
            orderColumnIds: JSON.stringify(
              newItems.map(container => container.columnId)
            )
          }
        })
      )
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
        await UpdateCardsOrder(activeContainer.columnId, {
          orderCardIds: JSON.stringify(
            newItems[activeContainerIndex].cards.map(card => card.cardId)
          )
        })
      } else {
        // in different container
        let newItems = [...containers]
        const [removedItem] = newItems[activeContainerIndex].cards.splice(
          activeItemIndex,
          1
        )
        newItems[overContainerIndex].cards.splice(overItemIndex, 0, removedItem)
        setContainers(newItems)
        await ChangeListOfCard(active.id, overContainer.columnId)
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
      await ChangeListOfCard(active.id, overContainer.columnId)
    }
    setActive(null)
  }
  const handleDragOver = event => {
    const { active, over } = event

    if (!over) return
    const activeType = active.data.current.type === 'card'
    const overType = over.data.current.type === 'card'
    const notSame = active?.id !== over?.id
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
  }
  const customCollisionDetectionAlgorithm = ({
    droppableContainers,
    ...args
  }) => {
    const rectIntersectionCollisions = rectIntersection({
      ...args,
      droppableContainers: droppableContainers.filter(
        ({ id }) => id === 'trash'
      )
    })
    if (rectIntersectionCollisions.length > 0) {
      return rectIntersectionCollisions
    }
    return closestCorners({
      ...args,
      droppableContainers: droppableContainers.filter(
        ({ id }) => id !== 'trash'
      )
    })
  }
  return (
    <div className={cx('board_canvas')}>
      <ol id="board" className={cx('board')}>
        <DndContext
          sensors={sensors}
          collisionDetection={customCollisionDetectionAlgorithm}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
        >
          <SortableContext items={containers.map(col => col.columnId)}>
            {containers &&
              containers?.map(col => {
                return (
                  <Column
                    containers={containers}
                    setContainers={setContainers}
                    orderCardIds={col.orderCardIds}
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
