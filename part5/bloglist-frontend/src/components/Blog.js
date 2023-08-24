import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, handleLikeButton, handleRemove }) => {
  const [visible, setVisible] = useState(false)
  const categoryImages = useSelector((state) => state.blog.categoryImages)
  // https://icons8.com/icon/85618/thumbs-up
  const showWhenVisible = { display: visible ? 'none' : '' }
  const buttonLabel = visible ? '+' : '-'
  const blogLiked = blog.likes.find(id => id === user._id)
  const iconUrl = categoryImages[blog.category]
  const likeButtonLabel = blogLiked ? 'dislike' : 'like'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleLikeButton: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
  }

  return (
    <div className='blog-post'>
      <div className='thumbnail' style={showWhenVisible}>
        <img  src={iconUrl} width='50px' alt={blog.category} />
      </div>
      <div className='post-content'>
        <div className='top-row'>
          <div className='post-details'>
            <h2 className='post-title'>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </h2>
            <p className='author' style={showWhenVisible}>
              <em>{blog.author}</em>
            </p>
            <p className='url' style={showWhenVisible}>
              {blog.url}
            </p>
          </div>
        </div>
        <div className='description' style={showWhenVisible}>
          <p>
            {blog.description !== undefined && blog.description}
          </p>
        </div>
      </div>
      <div className='bottom-row'>
        <div className='hide-view-button'>
          <Button variant='outline-secondary' size="sm" onClick={toggleVisibility}>{buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          <div className='user-info'>
            <p>by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link></p>
          </div>
          <p>
            likes {blog.likes.length}&nbsp;
            <Button onClick={handleLikeButton}>{likeButtonLabel}</Button>
          </p>
        </div>
      </div>

      {/* <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes.length}
          <button onClick={handleLikeButton}>{likeButtonLabel}</button>
        </p>
        <p>{blog.user.username}</p>
        <p>{blog.description !== undefined && blog.description}</p>
        <p>Category: {blog.category}</p>
        <div style={correctUser}>
          <button onClick={handleRemove}>remove</button>
        </div>
      </div> */}
    </div>
  )

  // return (
  //   <div className='blog'>
  //     <img className='blog-icon' src={iconUrl} alt={blog.category} />
  //     <div>
  //       <p>
  //         <Link to={`/blogs/${blog._id}`}>{blog.title} - {blog.author}</Link>
  //       </p>
  //     </div>
  //     <button onClick={toggleVisibility}>{buttonLabel}</button>
  //     <div style={showWhenVisible}>
  //       <p>{blog.url}</p>
  //       <p>
  //         likes {blog.likes.length}
  //         <button onClick={handleLikeButton}>{likeButtonLabel}</button>
  //       </p>
  //       <p>{blog.user.username}</p>
  //       <p>{blog.description !== undefined && blog.description}</p>
  //       <p>Category: {blog.category}</p>
  //       <div style={correctUser}>
  //         <button onClick={handleRemove}>remove</button>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default Blog
