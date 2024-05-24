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
export const UpdateCardsOrder = async (listId, data) => {
  try {
    const response = await axiosPrivate.patch(
      `/column/${listId}/update-order-card`,
      data
    )
    return response.data
  } catch (e) {
    console.log(e)
  }
}
export const ChangeListOfCard = async (cardId, listId) => {
  try {
    const response = await axiosPrivate.patch(
      `/card/${cardId}/change-list-card`,
      { columnId: listId }
    )
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
export const UpdateInforCard = async (cardId, data) => {
  try {
    const response = await axiosPrivate.put(
      `/card/${cardId}/update-infor-card`,
      { ...data }
    )
    return response
  } catch (e) {
    console.log(e)
  }
}
export const fetchListLabelInCard = async (cardId, token) => {
  try {
    const res = await axiosPrivate.get(`/cardlabel/${cardId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (e) {
    console.log(e)
  }
}
export const fetchCard = async (cardId, token) => {
  try {
    const res = await axiosPrivate.get(`/card/${cardId}/detail`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return res.data
  } catch (e) {
    console.log(e)
  }
}
