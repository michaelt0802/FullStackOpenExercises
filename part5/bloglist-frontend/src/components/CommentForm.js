import { useState } from 'react'
import PropTypes from 'prop-types'

const Create = ({ blog, createComment }) => {
  const [newContent, setNewContent] = useState('')

  const addComment = (event) => {
    event.preventDefault()

    const newComment = {
      content: newContent
    }

    createComment(blog, newComment)

    setNewContent('')
  }

  Create.propTypes = {
    createComment: PropTypes.func.isRequired
  }

  return (
    <form>
      <div>
        comment:{' '}
        <input
          value={newContent}
          onChange={(event) => setNewContent(event.target.value)}
        />
        <button type='submit' onClick={addComment}>
          add comment
        </button>
      </div>
    </form>
  )
}

export default Create