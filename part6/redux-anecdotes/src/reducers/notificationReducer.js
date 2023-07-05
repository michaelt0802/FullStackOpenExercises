import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    hideNotification: state => null,
  }
})

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer