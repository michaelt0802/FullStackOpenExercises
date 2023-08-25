import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { sortBlogs } from '../features/blogSlice'
import { selectCategory } from '../features/categorySlice'

const SortAndFilter = ({ categoryOptions }) => {
  const [newSort, setNewSort] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const dispatch = useDispatch()

  const sortOptions = [
    'Title',
    'Author',
    'Likes',
    'User'
  ]

  const updateSortValue = ({ target }) => {
    setNewSort(target.value)
  }

  const updateCategoryValue = ({ target }) => {
    setNewCategory(target.value)
  }

  const resetSelections = () => {
    setNewSort('')
    setNewCategory('')
  }

  useEffect(() => {
    dispatch(sortBlogs(newSort))
    dispatch(selectCategory(newCategory))
  }, [newSort, newCategory])

  return (
    <div className='sort-and-filter-container'>
      <label htmlFor='sortOptions'>Sort by: </label>
      <select
        name='sortOptions'
        id='sortOptions'
        value={newSort}
        onChange={updateSortValue}>
        {newSort === '' && <option value='Select'>Select</option>}
        {sortOptions.map((sort) => (
          <option
            key={sort}
            value={sort}>
            {sort}
          </option>
        ))}
      </select>
      <label htmlFor='categoryOptions'>&nbsp;Category: </label>
      <select
        name='categoryOptions'
        id='categoryOptions'
        value={newCategory}
        onChange={updateCategoryValue}>
        {newCategory === '' && <option value='Select'>Select</option>}
        {categoryOptions.map((category) => (
          <option
            key={category}
            value={category}>
            {category}
          </option>
        ))}
      </select>
      <button
        onClick={resetSelections}
        style={{ marginLeft: '10px' }}
      >Reset</button>
    </div>
  )
}

export default SortAndFilter