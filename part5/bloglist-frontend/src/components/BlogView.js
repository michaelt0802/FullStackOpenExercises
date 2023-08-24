import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import moment from 'moment'
import CommentForm from './CommentForm'

const BlogView = ({ handleLikeButton, handleRemove, createComment }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const user = useSelector((state) => state.user.user)
  const id = useMatch('/blogs/:id').params.id

  if(blogs.length === 0) {
    return null
  }

  const blog = blogs.find(blog => blog._id === id)
  const blogLiked = blog.likes.find(id => id === user._id)

  const likeButtonLabel = blogLiked ? 'dislike' : 'like'

  const correctUser = { display: blog.user.username === user.username ? '' : 'none' }

  console.log('blog', blog)

  return (
    <div>
      <h2><a target='_blank' rel='noreferrer' href={blog.url}>{blog.title}</a></h2>
      <em style={{ marginLeft: '30px' }}>by {blog.author}</em>
      <p>
        {blog.description !== undefined && ('Description: ' + blog.description)}
      </p>
      <p>
        added by <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link>
      </p>
      <p>
        likes {blog.likes.length}&nbsp;
        <button onClick={() => handleLikeButton(blog)}>{likeButtonLabel}</button>
      </p>
      <div style={correctUser}>
        <button onClick={() => handleRemove(blog)}>remove</button>
      </div>
      <div className='comments'>
        <h3>Comments</h3>
        <CommentForm blog={blog} createComment={createComment} />
        <ul>
          {blog.comments.map(comment => {
            return (<li key={comment._id} style={{ margin: '10px' }}>
              <p>{comment.content}</p>
              <em style={{ padding: '30px' }}>
                {moment(comment.createdAt).format('LLL')}
              </em>
            </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default BlogView