import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'

const User = () => {
  const id = useMatch('/users/:id').params.id
  const blogs = useSelector((state) => state.blog.blogs)

  if (blogs.length === 0) {
    return null
  }

  const user = blogs.find(blog => blog.user.id === id).user.username
  const userBlogs = blogs.filter(blog => blog.user.username === user)
  console.log('userBlogs', userBlogs)

  return (
    <div>
      <h2>{user}</h2>
      <h3>Added Blogs:</h3>
      <ul>
        {userBlogs.map(blog => {
          return (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>{blog.title} - {blog.author}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )

}

export default User