import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
  const blogs = useSelector((state) => state.blog.blogs)

  const getUsersCount = (blogs) => {
    return blogs.reduce((userBlogCount, blog) => {
      const user = blog.user.username
      if (!(user in userBlogCount)) {
        userBlogCount[user] = 1
      } else {
        userBlogCount[user]++
      }
      return userBlogCount
    }, {})
  }

  const userBlogCount = getUsersCount(blogs)

  console.log('userBlogCount', userBlogCount)

  return (
    <div>
      <h2>Users</h2>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>
              <strong>Blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(userBlogCount).map(([user, count]) => {
            return (
              <tr key={user}>
                <td><Link to="">{user}</Link></td>
                <td>{count}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}

export default User