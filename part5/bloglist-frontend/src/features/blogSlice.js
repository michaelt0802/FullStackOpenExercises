import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
  categoryImages: {
    'Art': 'https://www.freeiconspng.com/uploads/art-painting-icon-image-gallery-10.png',
    'Business': 'https://www.freeiconspng.com/uploads/business-people-meeting--free-business-icons-17.png',
    'Fashion': 'https://www.freeiconspng.com/uploads/fashion-shoe-icon-woman-6.png',
    'Food': 'https://www.freeiconspng.com/uploads/food-delivery-19.png',
    'Music': 'https://www.freeiconspng.com/uploads/black-music-note-icon-4.png',
    'News': 'https://www.freeiconspng.com/uploads/news-icon-3.png',
    'Personal': 'https://www.freeiconspng.com/uploads/msn-people-person-profile-user-icon--icon-search-engine-11.png',
    'Political': 'https://creazilla-store.fra1.digitaloceanspaces.com/icons/3246557/political-icon-size_256.png',
    'Sports': 'https://www.freeiconspng.com/uploads/sports-running-icon-2.png',
    'Technology': 'https://uxwing.com/wp-content/themes/uxwing/download/internet-network-technology/technology-icon.png',
    'Travel': 'https://www.freeiconspng.com/uploads/-earth-find-flight-fly-globe-map-travel-icon--icon-search-engine-4.png'
  }
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