import { useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import '../bootstrap.css'

const User = ({ handleRemove }) => {
  const id = useMatch('/users/:id').params.id
  const blogs = useSelector((state) => state.blog.blogs)
  const currentUser = useSelector((state) => state.user.user)

  if (blogs.length === 0) {
    return null
  }

  const user = blogs.find(blog => blog.user.id === id).user.username
  const userBlogs = blogs.filter(blog => blog.user.username === user)

  const correctUser = { display: user === currentUser.username ? '' : 'none' }

  return (
    <div>
      <h2>{user}</h2>
      <h3>Added Blogs:</h3>
      <div>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
              <th>Blog</th>
              <th>Author</th>
              <th>Category</th>
              <th>Likes</th>
              <th style={correctUser}>Remove</th>
            </tr>
          </thead>
          <tbody>

            {userBlogs.map(blog => {
              return (
                <tr key={blog._id}>
                  <td >
                    <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                  </td>
                  <td>
                    {blog.author}
                  </td>
                  <td>
                    {blog.category}
                  </td>
                  <td>
                    {blog.likes.length}
                  </td>
                  <td style={correctUser}>
                    <Button onClick={() => handleRemove(blog)}>remove</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default User