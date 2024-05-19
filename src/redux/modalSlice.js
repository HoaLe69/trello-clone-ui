import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isShowCreateWorkspaceModal: false
}

export const modalSlice = createSlice({
  name: 'popover',
  initialState,
  reducers: {
    showCreateModal(state) {
      state.isShowCreateWorkspaceModal = true
    },
    hideCreateModal(state) {
      state.isShowCreateWorkspaceModal = false
    }
  }
})

export const { showCreateModal, hideCreateModal } = modalSlice.actions

export default modalSlice.reducer

const selectorShowOrHideModalWorkspace = state =>
  state.modal.isShowCreateWorkspaceModal

export { selectorShowOrHideModalWorkspace }
