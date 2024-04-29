import { createSlice } from '@reduxjs/toolkit'
import {
  createBoard,
  fetchDetailBoard,
  fetchListBoard
} from './api-client/board'

const initialState = {
  create: {
    status: 'idle',
    board: {}
  },
  fetch: {
    status: 'idle',
    board: {}
  },
  fetchList: {
    status: 'idle',
    list: []
  }
}
export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    resetStatus(state) {
      state.create.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
      // create
      .addCase(createBoard.pending, state => {
        state.create.status = 'loading'
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.create.status = 'succeeded'
        const { data } = action.payload
        state.create.board = data
      })
      .addCase(createBoard.rejected, state => {
        state.create.status = 'failure'
      })
      // fetch detail
      .addCase(fetchDetailBoard.pending, state => {
        state.fetch.status = 'loading'
      })
      .addCase(fetchDetailBoard.fulfilled, (state, action) => {
        state.fetch.status = 'succeeded'
        const { data } = action.payload
        state.fetch.board = data
      })
      .addCase(fetchDetailBoard.rejected, state => {
        state.fetch.status = 'failure'
      })
      //list
      .addCase(fetchListBoard.pending, state => {
        state.fetchList.status = 'loading'
      })
      .addCase(fetchListBoard.fulfilled, (state, action) => {
        state.fetch.status = 'succeeded'
        const { data } = action.payload
        state.fetchList.list = data
      })
      .addCase(fetchListBoard.rejected, state => {
        state.fetchList.status = 'failure'
      })
  }
})
export const { resetStatus } = boardSlice.actions
export default boardSlice.reducer
