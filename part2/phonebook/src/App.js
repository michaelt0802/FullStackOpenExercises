import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    phonebookService.getAll()
    .then(initialData => {
      setPersons(initialData)
    })
   }, [])


  const addNewPerson = (event) => {
    event.preventDefault()
    const nameObject = { name : newName, number: newNumber }

    if(persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already in the phonebook`)) {
        const id = persons.find(n => n.name === newName)._id

        phonebookService
          .update(id, nameObject)
          .then(returnedPerson => {
          console.log('returnedPerson', returnedPerson)
          setPersons(persons.map(n => n._id !== id ? n : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(`Updated '${newName}' Successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          })
          .catch(error => {
            console.log(error.response.data.error)
            setMessageType('error')
            setMessage(
              error.response.data.error
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      phonebookService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessageType('success')
          setMessage(`Added '${newName}' Successfully`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
      })
      .catch(error => {
        console.log(error.response.data.error)
        setMessageType('error')
        setMessage(
          error.response.data.error
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(n => n.name !== newName))
      })
    }
  }

  const onRemove = id => {
    console.log('remove _id', id)
    if (window.confirm(`Are you sure you want to delete ${persons.find(n => n._id === id).name}?`)) {
      phonebookService
        .remove(id)
        .then(response => {
          console.log('filter', persons.filter(n => n._id !== id))
          setPersons(persons.filter(n => n._id !== id))})
        .catch(error => {
          alert(
            'error deleting person'
          )
        })
    }
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={message} messageType={messageType}/>

      <Filter newFilter={newFilter} handleFilter={handleFilter}/>

      <h2>Add a New Person</h2>

      <PersonForm newName={newName} newNumber={newNumber} handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput} addNewPerson={addNewPerson}/>

      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} onRemove={onRemove}/>
    </div>
  )
}

export default App