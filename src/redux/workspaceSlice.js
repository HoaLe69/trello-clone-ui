import { createSlice } from '@reduxjs/toolkit'
import { createWorkspace, fetchListWorkspaceUser } from './api-client/workspace'

const initialState = {
  workspace: {},
  list: [],
  status: 'idle',
  listStatus: 'idle'
}

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    resetStatus: state => {
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(createWorkspace.pending, state => {
        state.status = 'loading'
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { data } = action.payload
        state.workspace = data
      })
      .addCase(createWorkspace.rejected, state => {
        state.status = 'failure'
      })
      .addCase(fetchListWorkspaceUser.pending, state => {
        state.listStatus = 'loading'
      })
      .addCase(fetchListWorkspaceUser.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        const { data } = action.payload
        state.list = data
      })
      .addCase(fetchListWorkspaceUser.rejected, state => {
        state.listStatus = 'failure'
      })
  }
})

export default workspaceSlice.reducer

export const { resetStatus } = workspaceSlice.actions
