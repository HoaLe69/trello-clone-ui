import { createSlice } from '@reduxjs/toolkit'
import {
  createBoard,
  fetchDetailBoard,
  fetchListBoard,
  UpdateColumnOrder
} from './api-client/board'

const initialState = {
  create: {
    status: 'idle',
    board: {}
  },
  detail: {
    status: 'idle',
    board: {}
  },
  fetchList: {
    status: 'idle',
    list: []
  },
  updateOrderCol: {
    status: 'idle'
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
        state.detail.status = 'loading'
      })
      .addCase(fetchDetailBoard.fulfilled, (state, action) => {
        state.detail.status = 'succeeded'
        const { data } = action.payload
        state.detail.board = data
      })
      .addCase(fetchDetailBoard.rejected, state => {
        state.detail.status = 'failure'
      })
      //list
      .addCase(fetchListBoard.pending, state => {
        state.fetchList.status = 'loading'
      })
      .addCase(fetchListBoard.fulfilled, (state, action) => {
        state.fetchList.status = 'succeeded'
        const { data } = action.payload
        state.fetchList.list = data
      })
      .addCase(fetchListBoard.rejected, state => {
        state.fetchList.status = 'failure'
      })
      //update order column
      .addCase(UpdateColumnOrder.pending, state => {
        state.updateOrderCol.status = 'loading'
      })
      .addCase(UpdateColumnOrder.fulfilled, state => {
        state.updateOrderCol.status = 'succeeded'
      })
      .addCase(UpdateColumnOrder.rejected, state => {
        state.updateOrderCol.status = 'failure'
      })
  }
})
export const { resetStatus } = boardSlice.actions
export default boardSlice.reducer
