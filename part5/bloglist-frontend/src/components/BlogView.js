import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import moment from 'moment'

const BlogView = ({ handleLikeButton }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const id = useMatch('/blogs/:id').params.id

  if(blogs.length === 0) {
    return null
  }

  const blog = blogs.find(blog => blog._id === id)
  console.log('blog', blog)

  return (
    <div>
      <h2>{blog.title} - {blog.author}</h2>
      <a href={blog.url}>{blog.title}</a>
      <p>
        likes {blog.likes}
        <button onClick={() => handleLikeButton(blog)}>like</button>
      </p>
      <p>
        added by {blog.user.username}
      </p>
      <div>
        <h2>Comments</h2>
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