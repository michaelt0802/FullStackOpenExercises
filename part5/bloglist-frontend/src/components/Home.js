import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const Home = ({ handleLikeButton, handleRemove }) => {
  const blogs = useSelector((state) => state.blog.blogs)
  const blog = blogs[Math.floor((Math.random()*blogs.length) | 0)]
  const user = useSelector((state) => state.user.user)
  return (
    <div>
      {blog !== undefined &&
        <>
          <h1 className='center-text'>BlogList Aggregator</h1>
          <h4 className='center-text'>A place to find and submit your favorite blogs!</h4>
          <Blog
            key={blog._id}
            blog={blog}
            user={user}
            handleLikeButton={() => handleLikeButton(blog)}
            handleRemove={() => handleRemove(blog)}
          />
          <p>
            <Link to={`/blogs/${blog._id}`}>{blog.title} - {blog.author}</Link>
          </p>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes.length}
          </p>
          <p>{blog.user.username}</p>
          <p>{blog.description !== undefined && blog.description}</p>
          <p>Category: {blog.category}</p>
        </>}
    </div>
    // <div>
    //   {blog !== undefined &&
    //     <>
    //       <h1 className='center-text'>BlogList Aggregator</h1>
    //       <h4 className='center-text'>A place to find and submit your favorite blogs!</h4>
    //       <p>
    //         <Link to={`/blogs/${blog._id}`}>{blog.title} - {blog.author}</Link>
    //       </p>
    //       <p>{blog.url}</p>
    //       <p>
    //         likes {blog.likes.length}
    //       </p>
    //       <p>{blog.user.username}</p>
    //       <p>{blog.description !== undefined && blog.description}</p>
    //       <p>Category: {blog.category}</p>
    //     </>}
    // </div>

  )
}

export default Home