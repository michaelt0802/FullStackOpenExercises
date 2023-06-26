import { useState } from 'react'

const Blog = ({ blog, handleLikeButton, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    // paddingTop: 10,
    marginTop: 3,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    // marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none'}

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
  <div style={blogStyle}>
    <div>
      <p>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </p>
    </div>
    <div style={showWhenVisible}>
    <p>{blog.url}</p>
    <p>
      likes {blog.likes}
      <button onClick={handleLikeButton}>like</button>
    </p>
    <p>{blog.user.username}</p>
    <button onClick={handleRemove}>remove</button>
    </div>
  </div>
  )
}

export default Blog