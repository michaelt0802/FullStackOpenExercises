import React from 'react'
import ReactDOM from 'react-dom/client'
import noteReducer from './reducers/noteReducer'
import { legacy_createStore as createStore } from 'redux'
import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'
import NewNote from './components/NewNote'
import Notes from './components/Notes'


// const store = createStore(noteReducer)

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'state changes are made with actions',
//     important: false,
//     id: 2
//   }
// })



const App = () => {

  return(
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
