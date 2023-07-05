import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import store from './store'
import App from './App'

import filterReducer from './reducers/filterReducer'
import noteReducer, { setNotes } from './reducers/noteReducer'
import noteService from './services/notes'



// noteService.getAll().then(notes =>
//   store.dispatch(setNotes(notes))
// )



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)



// store.subscribe(App)