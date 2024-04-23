import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShowCreatePopover: false
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
    }
  }
})

export const { showCreatePopover, hideCreatePopover } = popoverSlice.actions
export default popoverSlice.reducer

const selectorShowOrHide = state => state.popover.isShowCreatePopover

export { selectorShowOrHide }
