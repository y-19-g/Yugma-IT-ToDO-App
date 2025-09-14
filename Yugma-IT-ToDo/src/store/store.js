// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer
  }
})

export default store
