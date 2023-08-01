import { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const Create = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newCategory, setNewCategory] = useState('')

  const categories = useSelector((state) => state.categories.categories)

  const addBlog = (event) => {
    event.preventDefault()

    const category = newCategory || categories[0]
    const newBlog = { title: newTitle, author: newAuthor, url: newUrl, description: newDescription, category }

    createBlog(newBlog)

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewDescription('')
    setNewCategory('')
  }

  Create.propTypes = {
    createBlog: PropTypes.func.isRequired,
  }

  return (
    <form>
      <div>
        title:{' '}
        <input
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
        />
      </div>
      <div>
        description (what is this blog all about?):{' '}
        <input
          value={newDescription}
          onChange={(event) => setNewDescription(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor='category'>Choose a category:</label>
        <select name='category' id='category' defaultValue={categories[0]}
          onChange={(event) => setNewCategory(event.target.value)}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <button type='submit' onClick={addBlog}>
          create
        </button>
      </div>
    </form>
  )
}

export default Create
