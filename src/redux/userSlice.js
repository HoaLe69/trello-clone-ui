import { createSlice } from '@reduxjs/toolkit'
import { addUserToBoard, fetchListUserBoard, search } from './api-client/user'

const initialState = {
  search: {
    status: 'idle',
    res: []
  },
  fetchList: {
    status: 'idle',
    list: []
  },
  addUserToBoard: {
    status: 'idle'
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(search.pending, state => {
        state.search.status = 'loading'
      })
      .addCase(search.fulfilled, (state, action) => {
        state.search.status = 'succeeded'
        const { data } = action.payload
        state.search.res = data
      })
      .addCase(search.rejected, state => {
        state.search.status = 'failure'
      })
      .addCase(fetchListUserBoard.pending, state => {
        state.fetchList.status = 'loading'
      })
      .addCase(fetchListUserBoard.fulfilled, (state, action) => {
        state.fetchList.status = 'succeeded'
        const { data } = action.payload
        state.fetchList.list = data
      })
      .addCase(fetchListUserBoard.rejected, state => {
        state.fetchList.status = 'failure'
      })
      .addCase(addUserToBoard.pending, state => {
        state.addUserToBoard.status = 'loading'
      })
      .addCase(addUserToBoard.fulfilled, (state, action) => {
        state.addUserToBoard.status = 'succeeded'
        const { data } = action.payload
        state.fetchList.list = [...state.fetchList.list, data]
      })
      .addCase(addUserToBoard.rejected, state => {
        state.addUserToBoard.status = 'failure'
      })
  }
})

export default userSlice.reducer
