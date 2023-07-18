import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  messageType: ''
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      console.log('state', state)
      console.log('action', action)
      state.message = action.payload.message
      state.messageType = action.payload.messageType
    },
    reset: (state) => {
      state.message = null,
      state.messageType = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { setMessage, reset } = notificationSlice.actions

export default notificationSlice.reducer