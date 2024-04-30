import { createSlice } from '@reduxjs/toolkit'
import {
  createWorkspace,
  fetchListWorkspaceUser,
  fetchWorkspaceDetail
} from './api-client/workspace'

const initialState = {
  create: {
    status: 'idle',
    workspace: {}
  },
  fetchList: {
    list: [],
    status: 'idle'
  },
  detail: {
    workspace: [],
    status: 'idle'
  }
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
      //create
      .addCase(createWorkspace.pending, state => {
        state.create.status = 'loading'
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.create.status = 'succeeded'
        const { data } = action.payload
        state.create.workspace = data
      })
      .addCase(createWorkspace.rejected, state => {
        state.create.status = 'failure'
      })
      //fetchlist
      .addCase(fetchListWorkspaceUser.pending, state => {
        state.fetchList.listStatus = 'loading'
      })
      .addCase(fetchListWorkspaceUser.fulfilled, (state, action) => {
        state.fetchList.listStatus = 'succeeded'
        const { data } = action.payload
        state.fetchList.list = data
      })
      .addCase(fetchListWorkspaceUser.rejected, state => {
        state.fetchList.listStatus = 'failure'
      })
      //detail
      .addCase(fetchWorkspaceDetail.pending, state => {
        state.detail.status = 'loading'
      })
      .addCase(fetchWorkspaceDetail.fulfilled, (state, action) => {
        state.detail.status = 'succeeded'
        const { data } = action.payload
        state.detail.workspace = data
      })
      .addCase(fetchWorkspaceDetail.rejected, state => {
        state.detail.status = 'failure'
      })
  }
})

export default workspaceSlice.reducer

export const { resetStatus } = workspaceSlice.actions
