import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = ({ handleLikeButton, handleRemove }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const user = useSelector((state) => state.user.user)

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog._id}
          blog={blog}
          user={user}
          handleLikeButton={() => handleLikeButton(blog)}
          handleRemove={() => handleRemove(blog)}
        />
      ))}
    </div>
  )
}

export default Blogs