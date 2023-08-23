import { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

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
  }

  Create.propTypes = {
    createBlog: PropTypes.func.isRequired,
  }

  return (
    <Form className='blog-form'>
      <Form.Group>
        <Form.Label>Title: </Form.Label>
        <Form.Control
          value={newTitle}
          placeholder='Title'
          onChange={(event) => setNewTitle(event.target.value)}
        />
        <Form.Label className='add-margin-top'>Author: </Form.Label>
        <Form.Control
          value={newAuthor}
          placeholder='Author'
          onChange={(event) => setNewAuthor(event.target.value)}
        />
        <Form.Label className='add-margin-top'>Url: </Form.Label>
        <Form.Control
          value={newUrl}
          placeholder='https://...'
          onChange={(event) => setNewUrl(event.target.value)}
        />
        <Form.Label className='add-margin-top'>Description: </Form.Label>
        <Form.Control
          value={newDescription}
          placeholder='What is this blog all about?'
          onChange={(event) => setNewDescription(event.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className='add-margin-top' htmlFor='category'>Choose a category:</Form.Label>
        <Form.Select name='category' id='category' defaultValue={categories[0]}>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Button className='button-container' variant='primary' type='submit' onClick={addBlog}>
        create
      </Button>

    </Form>
  )

  // return (
  //   <form>
  //     <div>
  //       title:{' '}
  //       <input
  //         value={newTitle}
  //         onChange={(event) => setNewTitle(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       author:{' '}
  //       <input
  //         value={newAuthor}
  //         onChange={(event) => setNewAuthor(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       url:{' '}
  //       <input
  //         value={newUrl}
  //         onChange={(event) => setNewUrl(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       description (what is this blog all about?):{' '}
  //       <input
  //         value={newDescription}
  //         onChange={(event) => setNewDescription(event.target.value)}
  //       />
  //     </div>
  //     <div>
  //       <label htmlFor='category'>Choose a category:</label>
  //       <select name='category' id='category' defaultValue={categories[0]}
  //         onChange={(event) => setNewCategory(event.target.value)}>
  //         {categories.map((category) => (
  //           <option key={category} value={category}>{category}</option>
  //         ))}
  //       </select>
  //     </div>
  //     <div>
  //       <button type='submit' onClick={addBlog}>
  //         create
  //       </button>
  //     </div>
  //   </form>
  // )
}

export default Create
