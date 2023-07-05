import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification (state, action) {
      return action.payload
    },
    hideNotification: state => null,
  }
})

export const { showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (content, seconds) => {
  return dispatch => {
    console.log('content', content)
    console.log('seconds', seconds)
    dispatch(showNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)

  }
}
export default notificationSlice.reducer