import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate, Router } from 'react-router-dom'
import { setMessage, resetNotification } from './features/notificationSlice'
import { initializeBlogs, sortBlogs, addBlog, updateBlog, removeBlog } from './features/blogSlice'
import { setUser, resetUser } from './features/userSlice'
import { resetLogin } from './features/loginSlice'
import { intializeCategories } from './features/categorySlice'
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
import Search from './components/Search'

const App = () => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)
  const user = useSelector((state) => state.user.user)

  // const blogs = useSelector((state) => state.blog.blogs)
  // console.log('userApp', user)
  // console.log('blogsApp', blogs)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const categoryOptions = [
    'Personal',
    'Business',
    'Fashion',
    'News',
    'Lifestyle',
    'Travel',
    'Food',
    'Reviews',
    'Multimedia',
    'Music',
    'Sports',
    'Political',
    'Art',
    'Entertainment',
    'Technology'
  ]

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

  useEffect(() => {
    dispatch(intializeCategories(categoryOptions))
  }, [])

  const padding = {
    padding: 5
  }

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
    try {
      const updateObject = await blogService.likeBlog(blogObject._id, user._id)

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
    if(blogObject.title.length === 0) {
      dispatch(setMessage({
        message: 'Missing title',
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    } else if(blogObject.author.length === 0) {
      dispatch(setMessage({
        message: 'Missing author',
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    } else if(blogObject.url.length === 0) {
      dispatch(setMessage({
        message: 'Missing url',
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    } else if(blogObject.category.length === 0) {
      dispatch(setMessage({
        message: 'Missing category',
        messageType: 'error'
      }))
      setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
    } else {
      try {
        console.log('blogObject', blogObject)
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

  }

  const createComment = async (blogObject, commentObject) => {
    try {
      const response = await blogService.addComment(blogObject._id, commentObject)
      const newComment = response
      console.log('newComment', newComment)

      const updateObject = {
        ...blogObject,
        comments: [...blogObject.comments, newComment]
      }

      dispatch(updateBlog({
        blogObject,
        updateObject
      }))
    } catch (error) {
      console.error(error)
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
      <div>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/users'>Users</Link>
        <em>{user.username} logged in{' '}</em>
        <button onClick={handleLogOut}>log out</button>
      </div>
      <h2>blogs</h2>

      <Notification />

      <Routes>
        <Route path='blogs/:id' element={<BlogView handleLikeButton={handleLikeButton} createComment={createComment}/>} />
        <Route path='users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={
          <div>
            <Search />
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
