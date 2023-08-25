import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: [],
  categorySelect: ''
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    intializeCategories: (state, action) => {
      state.categories = action.payload
    },
    selectCategory: (state, action) => {
      state.categorySelect = action.payload
    }
  }
})

export const { intializeCategories, selectCategory } = categorySlice.actions

export default categorySlice.reducer