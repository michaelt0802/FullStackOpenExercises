const Filter = ({newFilter, handleFilter}) => {
  return <div>
    filter names: <input value={newFilter} onChange={handleFilter}/>
    </div>
}

export default Filter