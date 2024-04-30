import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosPrivate } from '../../config/axios'

export const createWorkspace = createAsyncThunk(
  'workspace/create',
  async data => {
    try {
      const response = await axiosPrivate.post('/workspace', data.workspace)
      const { workSpaceId } = response.data.data
      await axiosPrivate.post('/userworkspace', {
        workspaceId: workSpaceId,
        userId: data.userId,
        role: 0
      })
      return response.data
    } catch (e) {
      return e.response.data
    }
  }
)

export const fetchListWorkspaceUser = createAsyncThunk(
  'workspace/getlist',
  async userId => {
    try {
      await new Promise(resolver => setTimeout(resolver, 1000))
      const response = await axiosPrivate.get(
        `/userworkspace/${userId}/workspace-of-user`
      )
      return response.data
    } catch (e) {
      return e.response.data
    }
  }
)

export const fetchWorkspaceDetail = createAsyncThunk(
  'workspace/detail',
  async workspaceId => {
    try {
      // await new Promise(resolver => setTimeout(resolver, 10000))
      const response = await axiosPrivate.get(
        `/workspace/${workspaceId}/detail`
      )
      return response.data
    } catch (e) {
      console.log(e)
    }
  }
)
