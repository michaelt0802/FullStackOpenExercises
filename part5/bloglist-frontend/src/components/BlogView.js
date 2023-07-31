import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import moment from 'moment'
import CommentForm from './CommentForm'

const BlogView = ({ handleLikeButton, createComment }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const likedByUser = useSelector((state) => state.user.likedBlogs)
  const id = useMatch('/blogs/:id').params.id

  if(blogs.length === 0) {
    return null
  }

  console.log('blogs', blogs)

  const blog = blogs.find(blog => blog._id === id)
  const blogLiked = likedByUser.includes(blog._id)

  const likeButtonLabel = blogLiked ? 'dislike' : 'like'

  console.log('blog', blog)

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <a href={blog.url}>{blog.title}</a>
      <p>
        likes {blog.likes.length}
        <button onClick={() => handleLikeButton(blog)}>{likeButtonLabel}</button>
      </p>
      <p>
        added by {blog.user.username}
      </p>
      <div>
        <h2>Comments</h2>
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