import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosPrivate } from '../../config/axios'

export const createBoard = createAsyncThunk('board/create', async data => {
  try {
    const response = await axiosPrivate.post('/board', data.board)
    const { boardId } = response.data.data
    await axiosPrivate.post('/userboard', {
      userId: data.userId,
      boardId,
      role: 0
    })
    return response.data
  } catch (e) {
    console.log(e)
  }
})

export const fetchDetailBoard = createAsyncThunk(
  'board/fetchDetail',
  async boardId => {
    try {
      // await new Promise(resolver => setTimeout(resolver, 1000))
      const response = await axiosPrivate.get(`/board/${boardId}/detail`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)
export const UpdateColumnOrder = createAsyncThunk(
  'board/update-order-column',
  async data => {
    try {
      const response = await axiosPrivate.patch(
        `/board/${data.boardId}/update-order-column`,
        { ...data.body }
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)
export const fetchListBoard = createAsyncThunk(
  'board/fetchList',
  async workspaceId => {
    try {
      const response = await axiosPrivate.get(`/board/${workspaceId}/list`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)
