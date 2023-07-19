import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'

const BlogView = ({ handleLikeButton }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  console.log('blogs', blogs)
  const id = useMatch('/blogs/:id').params.id
  console.log('id', id)

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

    </div>
  )
}

export default BlogView