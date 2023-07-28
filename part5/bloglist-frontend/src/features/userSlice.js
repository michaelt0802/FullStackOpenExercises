import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  likedBlogs: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    resetUser: (state) => {
      state.user = null
    },
    addLikedBlog: (state, action) => {
      state.likedBlogs.push(action.payload)
    },
    removeLikedBlog: (state, action) => {
      state.likedBlogs.filter(like => like !== action.payload)
    }
  }
})

export const { setUser, resetUser, addLikedBlog, removeLikedBlog } = userSlice.actions

export default userSlice.reducer