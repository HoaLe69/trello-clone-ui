import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShowCreatePopover: false,
  isShowCreateBoardPopover: false
}

export const popoverSlice = createSlice({
  name: 'popover',
  initialState,
  reducers: {
    showCreatePopover(state) {
      state.isShowCreatePopover = true
    },
    hideCreatePopover(state) {
      state.isShowCreatePopover = false
    },
    showCreateBoardPopover(state) {
      state.isShowCreateBoardPopover = true
    },
    hideCreateBoardPopover(state) {
      state.isShowCreateBoardPopover = false
    },
    hideAllPopover(state) {
      state.isShowCreateBoardPopover = false
      state.isShowCreatePopover = false
    }
  }
})

export const {
  showCreateBoardPopover,
  hideCreateBoardPopover,
  showCreatePopover,
  hideCreatePopover,
  hideAllPopover
} = popoverSlice.actions
export default popoverSlice.reducer

const selectorShowOrHide = state => state.popover.isShowCreatePopover

export { selectorShowOrHide }
