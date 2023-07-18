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
      state.message = action.payload.message
      state.messageType = action.payload.messageType
    },
    resetNotification: (state) => {
      state.message = null,
      state.messageType = ''
    },
  },
})

export const { setMessage, resetNotification } = notificationSlice.actions

export default notificationSlice.reducer