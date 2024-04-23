import { createSlice } from '@reduxjs/toolkit'
import { register, login } from './api-client/auth'

const initialState = {
  user: {},
  token: null,
  status: 'idle'
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.status = 'loading'
      })
      .addCase(register.fulfilled, state => {
        state.status = 'succeeded'
      })
      .addCase(register.rejected, state => {
        state.status = 'failure'
      })

      .addCase(login.pending, state => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        const { current_user, access_token } = action.payload
        state.status = 'succeeded'
        state.user = current_user
        state.token = access_token
      })
      .addCase(login.rejected, state => {
        state.status = 'failure'
      })
  }
})

export default authSlice.reducer
