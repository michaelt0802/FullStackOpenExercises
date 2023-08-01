import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  password: '',
  isSignUp: false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    },
    resetLogin: (state) => {
      state.username = ''
      state.password = ''
      state.isSignUp = false
    },
    signUp: (state) => {
      state.isSignUp = true
    }
  }
})

export const { setUsername, setPassword, resetLogin, signUp } = loginSlice.actions

export default loginSlice.reducer