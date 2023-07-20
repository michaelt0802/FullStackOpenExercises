import { useState } from 'react'
import PropTypes from 'prop-types'

const Create = ({ createComment }) => {
  const [newContent, setNewContent] = useState('')

  const addComment = (event) => {
    event.preventDefault()

    const newComment = {
      content: newContent
    }

    createComment(newComment)

    setNewContent('')
  }

  Create.PropTypes = {
    createComment: PropTypes.func.isRequired
  }

  return (
    <form>
      <div>
        comment:{' '}
        <input
          value={newContent}
          onChange={(event) => event.target.value}
        />
      </div>
      <div>
        <button type='submit' onClick={addComment}>
          add comment
        </button>
      </div>
    </form>
  )
}

export default Create