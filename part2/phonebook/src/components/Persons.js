const Persons = ({persons, filter}) => {
  if (filter !== '') {
    const filterArray = persons.filter(person => person.name.includes(filter))
    return filterArray.map(persons => <Person key={persons.name} name={persons.name} number={persons.number}/>)
  }
  return persons.map(persons => <Person key={persons.name} name={persons.name} number={persons.number}/>)
}

const Person = ({name, number}) => (
  <p>{name} {number}</p>
)



export default Persons