import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosPrivate } from '../../config/axios'

export const createList = createAsyncThunk('list/create', async data => {
  try {
    const response = await axiosPrivate.post('/column', data)
    return response.data
  } catch (e) {
    console.log(e)
  }
})
