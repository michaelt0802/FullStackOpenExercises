import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {
  const blogs = useSelector((state) => state.blog.blogs)
  console.log('blogs', blogs)
  const randomNum = Math.floor((Math.random()*blogs.length) | 0)
  console.log('randomNum', randomNum)
  const blog = blogs[randomNum]
  console.log('blog', blog)
  return (
    <div>
      {blog !== undefined &&
        <>
          <h2>BlogList Aggregator</h2>
          <h4>A place to find and submit your favorite blogs!</h4>
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
  )
}

export default Home