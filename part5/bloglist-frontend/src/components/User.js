import { useSelector } from 'react-redux'

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
    }, [])
  }

  const userBlogCount = getUsersCount(blogs)

  console.log('userBlogCount', userBlogCount)

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th ><strong>Blogs created</strong></th>
        </tr>
      </thead>
    </table>

  // {userBlogCount.map(user) => {


  // }}

  )

}

export default User