import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosPrivate } from '../../config/axios'
import boardSlice from '../boardSlice'

export const search = createAsyncThunk('user/search', async keyword => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000))
    const response = await axiosPrivate.get(`/users/${keyword}/search`)
    return response.data
  } catch (e) {
    console.log(e)
  }
})

export const fetchListUserBoard = createAsyncThunk(
  'user/fetchList',
  async boardId => {
    try {
      const response = await axiosPrivate.get(`/userboard/${boardId}/users`)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)

export const addUserToBoard = createAsyncThunk(
  'user/addToBoard',
  async data => {
    try {
      const response = await axiosPrivate.post(`/userboard`, {
        userId: data.userId,
        boardId: data.boardId,
        role: 1
      })
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)
