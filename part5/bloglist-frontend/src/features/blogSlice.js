import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: []
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    initializeBlogs: (state, action) => {
      state.blogs = action.payload
    },
    sortBlogs: (state) => {
      state.blogs.sort((a, b) => b.likes - a.likes)
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload)
    },
    updateBlog: (state, action) => {
      state.blogs = state.blogs.map((blog) => (blog._id !== action.payload.blogObject._id ? blog : action.payload.updateObject))
    },
    removeBlog: (state, action) => {
      state.blogs = state.blogs.filter((blog) => blog._id !== action.payload._id)
    }
  },
})

export const { initializeBlogs, sortBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions

export default blogSlice.reducer