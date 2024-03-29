import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import '../bootstrap.css'

const Users = () => {
  const blogs = useSelector((state) => state.blog.blogs)

  const getUsersCount = (blogs) => {
    return blogs.reduce((userBlogCountArray, blog) => {
      const user = blog.user.username
      const existingUserIndex = userBlogCountArray.findIndex((userObj) => userObj.username === user)

      if (existingUserIndex === -1) {
        userBlogCountArray.push({
          username: user,
          count: 1,
          id: blog.user.id,
        })
      } else {
        userBlogCountArray[existingUserIndex].count++
      }

      return userBlogCountArray
    }, [])
  }

  const userBlogCount = getUsersCount(blogs)

  return (
    <div>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userBlogCount.map((userObj) => (
            <tr key={userObj.id}>
              <td><Link to={`/users/${userObj.id}`}>{userObj.username}</Link></td>
              <td>{userObj.count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Users