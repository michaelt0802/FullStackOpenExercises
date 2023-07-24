import { useSelector, useDispatch } from 'react-redux'
import { setQuery } from '../features/searchSlice'

const Search = () => {
  const dispatch = useDispatch()
  const query = useSelector((state) => state.search.query)

  const handleSearch = (event) => {
    dispatch(setQuery(event.target.value))
  }

  return (
    <div>
      Search: <input value={query} onChange={handleSearch}/>
    </div>
  )

}

export default Search