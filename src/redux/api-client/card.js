import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosPrivate } from '../../config/axios'

export const createCard = createAsyncThunk('card/create', async data => {
  try {
    const response = await axiosPrivate.post('/card', data)
    return response.data
  } catch (e) {
    console.log(e)
  }
})

export const addNewCard = async data => {
  try {
    const response = await axiosPrivate.post('/card', data)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

export const fetchListCard = createAsyncThunk(
  'card/fetchList',
  async listId => {
    try {
      const response = await axiosPrivate.get(`/card/${listId}/list`)
      console.log(response)
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)
export const fetchListCards = async listId => {
  try {
    const response = await axiosPrivate.get(`/card/${listId}/list`)
    return response.data
  } catch (e) {
    console.log(e)
  }
}
