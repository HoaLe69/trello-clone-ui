import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistStore } from 'redux-persist'
import persistReducer from 'redux-persist/es/persistReducer'
import authReducer from './authSlice'
import popoverReducer from './popoverSlice'
import modalReducer from './modalSlice'
import workspaceReducer from './workspaceSlice'
import boardReducer from './boardSlice'

const reducer = combineReducers({
  auth: authReducer,
  popover: popoverReducer,
  modal: modalReducer,
  workspace: workspaceReducer,
  board: boardReducer
})

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
