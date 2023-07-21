import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../features/blogSlice'
import userReducer from '../features/userSlice'
import loginReducer from '../features/loginSlice'
import notificationReducer from '../features/notificationSlice'
import categoriesReducer from '../features/categorySlice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    user: userReducer,
    login: loginReducer,
    notification: notificationReducer,
    categories: categoriesReducer
  },
})