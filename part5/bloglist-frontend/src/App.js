import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate, Router } from 'react-router-dom'
import { setMessage, resetNotification } from './features/notificationSlice'
import { initializeBlogs, sortBlogs, addBlog, updateBlog, removeBlog } from './features/blogSlice'
import { setUser, resetUser } from './features/userSlice'
import { resetLogin, setPassword, setUsername, signUp } from './features/loginSlice'
import { intializeCategories } from './features/categorySlice'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import BlogForm from './components/BlogForm'
import BlogView from './components/BlogView'
import Sort from './components/Sort'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Footer from './components/Footer'
import Togglable from './components/Toggleable'
import Search from './components/Search'
import Home from './components/Home'
import NavBar from './components/NavBar'
import blogService from './services/blogs'
import loginService from './services/login'
import signUpService from './services/signUp'
import { Nav, Navbar,  } from 'react-bootstrap'

const App = () => {
  const username = useSelector((state) => state.login.username)
  const password = useSelector((state) => state.login.password)
  const isSignUp = useSelector((state) => state.login.isSignUp)
  const user = useSelector((state) => state.user.user)
  const blogs = useSelector((state) => state.blog.blogs)

  console.log('userApp', user)
  // console.log('blogsApp', blogs)
  // console.log('isSignUp', isSignUp)

  const blogFormRef = useRef()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const categoryOptions = [
    'Art',
    'Business',
    'Entertainment',
    'Fashion',
    'Food',
    'Lifestyle',
    'Multimedia',
    'Music',
    'News',
    'Personal',
    'Political',
    'Reviews',
    'Sports',
    'Technology',
    'Travel'
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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
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

  const displayNotification = (message, messageType) => {
    dispatch(setMessage({
      message,
      messageType
    }))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }

  const isValidUrl = (urlString) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
    '(\\#[-a-z\\d_]*)?$','i') // validate fragment locator

    return !!urlPattern.test(urlString)
  }

  const logInUser = async () => {
    console.log('logging in')
    console.log('usernamelogin', username)
    console.log('passwordlogin', password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(resetLogin())
      navigate('/')
    } catch (error) {
      console.error('Wrong username or password', error)
      console.log(error.response.data.error)

      displayNotification('Wrong username or password', 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    await logInUser()
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    dispatch(resetUser())
    dispatch(resetLogin())
  }

  const handleSignUp = async (event) => {
    event.preventDefault()

    try {
      console.log('username', username)
      console.log('password', password)
      const user = await signUpService.signUp({
        username,
        password
      })

      console.log('user', user)
      await logInUser()
    } catch (error) {
      console.error(error)
      console.log(error.response.data.error)

      displayNotification('Must input valid username and password', 'error')
    }
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
      displayNotification('Missing title', 'error')
    } else if(blogObject.url.length === 0) {
      displayNotification('Missing url', 'error')
    } else if(!isValidUrl(blogObject.url)) {
      console.log('bad url')
      displayNotification('Invalid URL', 'error')
    } else if(blogObject.category.length === 0) {
      displayNotification('Missing category', 'error')
    } else {
      try {
        console.log('blogObject', blogObject)
        const blogFromServer = await blogService.create(blogObject)
        console.log('blogFromServer', blogFromServer)

        displayNotification(`A new blog '${blogObject.title}' by '${blogObject.author}' added Successfully`, 'success')

        blogFromServer.user = user

        dispatch(addBlog(blogFromServer))

        navigate('/blogs')
      } catch (error) {
        console.log(error.message)

        displayNotification(error.message, 'error')
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
    if (isSignUp === true) {
      return (
        <div>
          <SignUpForm handleSignUp={handleSignUp}
          />
        </div>
      )
    } else {
      return (
        <div>
          <LoginForm handleLogin={handleLogin}
          />
        </div>
      )
    }
  }

  return (
    <div className='container'>
      <NavBar handleLogOut={handleLogOut} />
      <Notification />
      <Routes>
        <Route path='blogs/:id' element={<BlogView handleLikeButton={handleLikeButton}
          handleRemove={handleRemove}
          createComment={createComment}/>}
        />
        <Route path='/blogs' element={
          <div>
            <h2>Blogs</h2>
            <Search />
            <Sort />
            <Blogs handleLikeButton={handleLikeButton} handleRemove={handleRemove} />
          </div>
        } />
        <Route path='users/:id' element={<User />} />
        <Route path='/users' element={<Users />} />
        <Route path='/submitForm/' element={<BlogForm createBlog={createBlog} />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
