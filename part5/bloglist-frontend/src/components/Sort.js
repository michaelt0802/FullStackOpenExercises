import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { sortBlogs } from '../features/blogSlice'

const Sort = () => {
  const [newSort, setNewSort] = useState('')
  const dispatch = useDispatch()

  const sortOptions = [
    'Title',
    'Author',
    'Likes',
    'Category',
    'User'
  ]

  const updateValue = ({ target }) => {
    setNewSort(target.value)
  }

  useEffect(() => {
    dispatch(sortBlogs(newSort))
  }, [newSort])

  return (
    <>
      <label htmlFor='Sort'>Sort by:</label>
      <select
        name='sortOptions'
        id='sortOptions'
        value={newSort}
        onChange={updateValue}>
        {newSort === '' && <option value='Select'>Select</option>}
        {sortOptions.map((sort) => (
          <option
            key={sort}
            value={sort}>
            {sort}
          </option>
        ))}
      </select>
    </>
  )
}

export default Sort