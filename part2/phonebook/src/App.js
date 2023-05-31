import { useState, useEffect } from 'react'

import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
        const id = persons.find(n => n.name === newName).id
        console.log('id', id)

        phonebookService
          .update(id, nameObject)
          .then(returnedPerson => {
          setPersons(persons.map(n => n.id !== id ? n : returnedPerson))
          setNewName('')
          setNewNumber('')
          })
      }
    } else {
      phonebookService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
      })
    }
  }

  const onRemove = id => {
    console.log('remove id', id)
    if (window.confirm(`Are you sure you want to delete ${id}?`)) {
      phonebookService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))})
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