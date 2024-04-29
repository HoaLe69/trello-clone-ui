import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosPrivate } from '../../config/axios'

export const createBoard = createAsyncThunk('board/create', async board => {
  try {
    await new Promise(resolver => setTimeout(resolver, 3000))
    const response = await axiosPrivate.post('/board', board)
    console.log(response.data)
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
