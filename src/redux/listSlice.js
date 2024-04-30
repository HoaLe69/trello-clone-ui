import { createSlice } from '@reduxjs/toolkit'
import { createList } from './api-client/list'

const initialState = {
  create: {
    status: 'idle',
    list: {}
  }
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createList.pending, state => {
        state.create.status = 'loading'
      })
      .addCase(createList.fulfilled, (state, action) => {
        const { data } = action.payload
        state.create.list = data
        state.create.status = 'succeeded'
      })
      .addCase(createList.rejected, state => {
        state.create.status = 'failure'
      })
  }
})

export default listSlice.reducer
