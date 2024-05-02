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

export const updateTitle = async (listId, title) => {
  try {
    const response = await axiosPrivate.patch(`/column/${listId}`, null, {
      params: { title }
    })
    return response
  } catch (e) {
    console.log(e)
  }
}
