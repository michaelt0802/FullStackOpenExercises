import { useSelector } from 'react-redux'
import Blog from './Blog'
const Blogs = ({ handleLikeButton, handleRemove }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const user = useSelector((state) => state.user.user)
  const filter = useSelector((state) => state.search.query).toLowerCase()

  if (filter !== '') {
    const blogsFilter = blogs.filter(blog => blog.title?.toLowerCase().includes(filter)
      || blog.author?.toLowerCase().includes(filter)
      || blog.category?.toLowerCase().includes(filter))

    return (
      <div>
        {blogsFilter.map((blog) => (
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