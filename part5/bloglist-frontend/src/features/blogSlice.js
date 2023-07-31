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
    sortBlogs: (state, action) => {
      switch (action.payload) {
      case 'Title':
        state.blogs.sort((a, b) => a.title.localeCompare(b.title, 'en', { 'sensitivity': 'base' }))
        break
      case 'Author':
        state.blogs.sort((a, b) => a.author.localeCompare(b.author, 'en', { 'sensitivity': 'base' }))
        break
      case 'Likes':
        state.blogs.sort((a, b) => b.likes.length - a.likes.length)
        break
      case 'Category':
        state.blogs.sort((a, b) => a.category.localeCompare(b.category, 'en', { 'sensitivity': 'base' }))
        break
      case 'User':
        state.blogs.sort((a, b) => a.user.username.localeCompare(b.user.username, 'en', { 'sensitivity': 'base' }))
        break
      default:
        state.blogs.sort((a, b) => b.likes.length - a.likes.length)
      }

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