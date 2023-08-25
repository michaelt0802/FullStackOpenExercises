import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = ({ handleLikeButton, handleRemove }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const user = useSelector((state) => state.user.user)
  const query = useSelector((state) => state.search.query).toLowerCase()
  const category = useSelector((state) => state.categories.categorySelect)

  if (query !== '' || category !== '') {
    const blogsFilter = blogs.filter(blog => (blog.title?.toLowerCase().includes(query)
      || blog.author?.toLowerCase().includes(query)
      || blog.user.username?.toLowerCase().includes(query))
      && blog.category?.includes(category))

    if (blogsFilter.length > 0) {
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
        No blogs matched your search query. Try something else!
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