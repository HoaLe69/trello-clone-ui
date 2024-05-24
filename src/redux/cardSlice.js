import { createSlice } from '@reduxjs/toolkit'
import { createCard, fetchListCard } from './api-client/card'

const initialState = {
  create: {
    status: 'idle',
    card: {}
  },
  fetchList: {
    list: [],
    status: 'idle'
  },
  activeCard: {
    id: null
  }
}

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getCurrentActiveCardId(state, action) {
      state.activeCard.id = action.payload
    }
  },
  extraReducers: builder => {
    builder
      // create
      .addCase(createCard.pending, state => {
        state.create.status = 'loading'
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.create.status = 'succeeded'
        const { data } = action.payload
        state.create.card = data
      })
      .addCase(createCard.rejected, state => {
        state.create.status = 'failure'
      })
      // fetch list
      .addCase(fetchListCard.pending, state => {
        state.fetchList.status = 'loading'
      })
      .addCase(fetchListCard.fulfilled, (state, action) => {
        state.fetchList.status = 'succeeded'
        const { data } = action.payload
        state.fetchList.list = data
      })
      .addCase(fetchListCard.rejected, state => {
        state.fetchList.status = 'failure'
      })
  }
})

export const { getCurrentActiveCardId } = cardSlice.actions
export default cardSlice.reducer
