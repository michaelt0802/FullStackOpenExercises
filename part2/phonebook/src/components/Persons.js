const Persons = ({persons, filter, onRemove}) => {
  if (filter !== '') {
    const filterArray = persons.filter(person => person.name.includes(filter))

    return filterArray.map(persons => <Person key={persons.name}
      name={persons.name} number={persons.number} onRemove={() => onRemove(persons._id)}/>)
  }
  return persons.map(persons => <Person key={persons.name}
    name={persons.name} number={persons.number} onRemove={() => onRemove(persons._id)}/>)
}


const Person = ({name, number, onRemove}) => (
  <p>{name} {number} <button onClick={onRemove}>delete</button></p>
)



export default Persons