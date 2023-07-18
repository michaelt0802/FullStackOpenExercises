import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'
import blogReducer from '../features/blog/blogSlice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer
  },
})