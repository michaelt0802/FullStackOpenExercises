const PersonForm = ({newName, newNumber, handleNameInput, handleNumberInput, addNewPerson}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameInput}/>
      </div>
      <div>
        number <input value={newNumber} onChange={handleNumberInput}/>
      </div>
      <div>
        <button type="submit" onClick={addNewPerson}>
          add
        </button>
      </div>
    </form>
  )
}

export default PersonForm