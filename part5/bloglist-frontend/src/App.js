import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { setMessage, resetNotification } from './features/notificationSlice'
import { initializeBlogs, sortBlogs, addBlog, updateBlog, removeBlog } from './features/blogSlice'
import { setUser, resetUser } from './features/userSlice'
import { resetLogin } from './features/loginSlice'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'

const App = () => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)
  const user = useSelector((state) => state.user.user)
  // const blogs = useSelector((state) => state.blog.blogs)
  // console.log('userApp', user)
  // console.log('blogsApp', blogs)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll()
      .then((blogs) => {
        dispatch(initializeBlogs(blogs))
        dispatch(sortBlogs())
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error.message)
      })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      dispatch(resetLogin())
    } catch (error) {
      console.error('Wrong username or password', error)
      console.log(error.response.data.error)

      dispatch(setMessage({
        message: 'Wrong username or password',
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(resetUser())
  }

  const handleLikeButton = async (blogObject) => {
    console.log('inside like button')
    try {
      const updateObject = {
        ...blogObject,
        likes: blogObject.likes + 1,
      }
      console.log('updateObject', updateObject)
      const response = await blogService.update(blogObject._id, updateObject)
      console.log('response', response)

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
        dispatch(resetNotification())
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
        dispatch(resetNotification())
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <h1>Log into Application</h1>
        <Notification />
        <LoginForm handleLogin={handleLogin}
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

      <Routes>
        <Route path='blogs/:id' element={<BlogView handleLikeButton={handleLikeButton}/>} />
        <Route path='users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={
          <div>
            <Togglable buttonLabel={'submit new blog'} ref={blogFormRef}>
              <BlogForm createBlog={createBlog} />
            </Togglable>
            <Blogs handleLikeButton={handleLikeButton} handleRemove={handleRemove} />
          </div>
        } />
      </Routes>


    </div>
  )
}

export default App
