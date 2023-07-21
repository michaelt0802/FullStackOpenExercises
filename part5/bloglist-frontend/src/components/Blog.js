import { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeButton, handleRemove }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    // paddingTop: 10,
    marginTop: 3,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    // marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const correctUser = { display: blog.user.username === user.username ? '' : 'none' }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLikeButton: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  }

  return (
    <div style={blogStyle}>
      <div>
        <p>
          <Link to={`/blogs/${blog._id}`}>{blog.title} - {blog.author}</Link>
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
        <p>Category: {blog.category}</p>
        <div style={correctUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
