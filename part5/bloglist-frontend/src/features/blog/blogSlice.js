import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: []
}

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    sortBlogs: (state) => {
      state.blogs.sort((a, b) => b.likes - a.likes)
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { sortBlogs, addBlog } = blogSlice.actions

export default blogSlice.reducer