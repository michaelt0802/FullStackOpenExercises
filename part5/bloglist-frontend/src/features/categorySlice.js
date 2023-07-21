import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categories: []
}

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    intializeCategories: (state, action) => {
      state.categories = action.payload
    }
  }
})

export const { intializeCategories } = categorySlice.actions

export default categorySlice.reducer