import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUser, loginUser, logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs.component'
import BlogForm from './components/BlogForm.component'
import Notification from './components/Notification/Notification.component'
import Togglable from './components/Togglable.component'
import Menu from './components/Menu/Menu.component'
import { Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Users from './components/Users/Users.component'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    console.log('use effect 1 ')
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
    console.log('use effect 2 ')
  }, [])

  const user = useSelector(state => state.user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()

  const loginHandler = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      dispatch(loginUser(credentials))
      setUsername('')
      setPassword('')
      dispatch(setNotification('successfully logged in', 'success', 3))
    }catch(exception){
      dispatch(setNotification('wrong username or password', 'error', 3))
    }
  }

  const createBlogHandler = async (newBlog) => {
    try{
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      dispatch(setNotification(`added a new blog ${newBlog.title} by ${newBlog.author}`, 'success', 3))
    }catch(exception) {
      dispatch(setNotification('unable to add the blog'))
    }
  }

  const logoutHandle = () => {
    dispatch(logoutUser())
  }

  if(user === null){
    return(
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={loginHandler}>
          <div>
            Username
            <input
              id="username"
              type="text"
              name="username"
              onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div>
            Password
            <input
              id="password"
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <button id="login-button" type='submit'>Login</button>
        </form>
      </div>
    )
  }

  const padding = {
    padding: 5
  }
  return (
    <div>
      <Container style={padding}>
        <Menu user={user} logoutHandler={logoutHandle} />
        <Notification />
        <h2>blogs</h2>
        <Togglable buttonLabel="add new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlogHandler} />
        </Togglable>
        {/* <Blogs user={user} /> */}
        <Routes>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/" element={<Blogs />}></Route>
        </Routes>

        <div style={{ marginTop: 30 }}>
          <hr/>
          <footer>© 2022, All Rights Reserved.</footer>
        </div>
      </Container>
    </div>
  )
}

export default App

