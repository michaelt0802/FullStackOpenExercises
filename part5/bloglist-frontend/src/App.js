import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage, reset } from './features/notification/notificationSlice'
import { initializeBlogs, sortBlogs, addBlog, updateBlog, removeBlog } from './features/blog/blogSlice'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogs = useSelector((state) => state.blog.blogs)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
      dispatch(sortBlogs())
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Wrong username or password', error)
      console.log(error.response.data.error)

      dispatch(setMessage({
        message: 'Wrong username or password',
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUsername('')
    setPassword('')
    setUser(null)
  }

  const handleLikeButton = async (blogObject) => {
    try {
      const updateObject = {
        ...blogObject,
        likes: blogObject.likes + 1,
      }
      await blogService.update(blogObject._id, updateObject)

      dispatch(updateBlog({
        blogObject,
        updateObject
      }))

      dispatch(sortBlogs())
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      console.log('remove _id', blogObject._id)
      if (
        window.confirm(
          `Are you sure you want to delete ${blogObject.title} by ${blogObject.author}`
        )
      ) {
        await blogService.remove(blogObject._id)
        dispatch(removeBlog(blogObject))
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const createBlog = async (blogObject) => {
    try {
      const blogFromServer = await blogService.create(blogObject)
      console.log('blogFromServer', blogFromServer)

      dispatch(setMessage({
        message: `A new blog '${blogObject.title}' by '${blogObject.author}' added Successfully`,
        messageType: 'success'
      }))
      setTimeout(() => {
        dispatch(reset())
      }, 5000)

      blogFromServer.user = user

      dispatch(addBlog(blogFromServer))
    } catch (error) {
      console.log(error.message)

      dispatch(setMessage({
        message: error.message,
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(reset())
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Log into Application</h1>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.username} logged in{' '}
        <button onClick={handleLogOut}>log out</button>
      </p>

      <Togglable buttonLabel={'submit new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

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

export default App
