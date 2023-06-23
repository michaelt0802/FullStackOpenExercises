import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
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

  const handleTitleInput = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlInput = (event) => {
    setNewUrl(event.target.value)
  }

  const handleBlogInput = async (event) => {
    event.preventDefault()

    const newBlog = { title: newTitle, author: newAuthor, url: newUrl }

    try {
      const blogFromServer = await blogService.create(newBlog)
      console.log('blogFromServer', blogFromServer)

      setMessageType('success')
      setMessage(`A new blog '${newTitle}' by '${newAuthor}' added Successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setBlogs(blogs.concat(blogFromServer))

    } catch (error) {
      console.log(error.response.data.error)
      setMessageType('error')
      setMessage(
        error.response.data.error
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

      <BlogForm newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl}
      handleTitleInput={handleTitleInput} handleAuthorInput={handleAuthorInput} handleUrlInput={handleUrlInput} handleBlogInput={handleBlogInput}/>

      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )
}

export default App