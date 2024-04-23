import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'

export const register = createAsyncThunk('auth/register', async user => {
  try {
    await new Promise(resolver => setTimeout(resolver, 3000))
    const response = await axios.post('/auth/register', user)
    return response.data
  } catch (e) {
    return e.response.data
  }
})

export const login = createAsyncThunk('auth/login', async user => {
  try {
    const response = await axios.post('/auth/login', user)
    return response.data
  } catch (e) {
    return e.response.data
  }
})
