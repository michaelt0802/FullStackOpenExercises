import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      console.log('blogs', blogs)
      setBlogs( blogs )
    }
    )
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
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Wrong username or password', error)
      console.log(error.response.data.error)
      setMessageType('error')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
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
        user: blogObject.user.id,
        likes: blogObject.likes + 1,
        author: blogObject.author,
        title: blogObject.title,
        url: blogObject.url
      }

      const blogFromServer = await blogService.update(blogObject._id, updateObject)
      blogFromServer.user = user
      setBlogs(blogs.map(blog => blog._id !== blogObject._id ? blog : blogFromServer))

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRemove = async (blogObject) => {
    try {
      console.log('remove _id', blogObject._id)
      if (window.confirm(`Are you sure you want to delete ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject._id)
        setBlogs(blogs.filter(blog => blog._id !== blogObject._id))
      }
    } catch (error) {
      console.log(error.message)
    }
  }


  const createBlog = async (blogObject) => {
    try {
      const blogFromServer = await blogService.create(blogObject)
      console.log('blogFromServer', blogFromServer)

      setMessageType('success')
      setMessage(`A new blog '${blogObject.title}' by '${blogObject.author}' added Successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      blogFromServer.user = user
      setBlogs(blogs.concat(blogFromServer))

    } catch (error) {
      console.log(error.message)
      setMessageType('error')
      setMessage(
        error.message
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Log into Application</h1>
        <Notification message={message} messageType={messageType}/>
        <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} messageType={messageType}/>

      <p>{user.username} logged in <button onClick={handleLogOut}>log out</button></p>

      <Togglable buttonLabel={'submit new blog'} ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Togglable>


      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} handleLikeButton={() => handleLikeButton(blog)}
          handleRemove={() => handleRemove(blog)} />
      )}
    </div>
  )
}

export default App