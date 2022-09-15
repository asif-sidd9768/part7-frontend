import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification/Notification.component'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  // const blgs = useSelector(state => state.blogs)
  // console.log('blgsss ===== ', blgs)

  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [style, setStyle] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()


  // useEffect(() => {
  //   blogService.getAll().then(blogs => {
  // blogs.sort(function(a, b) {
  //   var keyA = a.likes,
  //   keyB = b.likes
  //   if (keyA > keyB) return -1
  //   if (keyA < keyB) return 1
  //   return 0
  // })
  //     setBlogs( blogs )
  //     console.log('USE Effect 1')
  //   })
  // }, [])

  useEffect(() => {
    const loggenInUser = window.localStorage.getItem('loggedInUser')
    if(loggenInUser){
      const user = JSON.parse(loggenInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
    console.log('USE Effect2')
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault()
    const credentials = {
      username,
      password
    }
    try {
      const user = await loginService.loginUser(credentials)
      setUser(user)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    }catch(exception){
      setMessage('wrong username or password')
      setStyle('error')
      setTimeout(() => {
        setMessage('')
        setStyle('')
      }, 4000)
      console.log('x-x-x-x ', message)
    }
  }

  const createBlogHandler = async (newBlog) => {
    try{
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(newBlog))
      // const returnedBlog = await blogService.create(newBlog)
      // setBlogs(blogs.concat(returnedBlog))
      dispatch(setNotification(`added a new blog ${newBlog.title} by ${newBlog.author}`, 'success', 3))
      // setMessage(`added a new blog ${newBlog.title} by ${newBlog.author}`)
      // setStyle('success')
      // setTimeout(() => {
      //   setMessage('')
      //   setStyle('')
      // }, 4000)
    }catch(exception) {
      dispatch(setNotification('unable to add the blog'))
      // setMessage('unable to add the blog')
      // setStyle('error')
      // setTimeout(() => {
      //   setMessage('')
      //   setStyle('')
      // }, 4000)
    }
  }

  // const blogLikeHandler = async (id, updatedBlog) => {
  //   try{
  //     //console.log(id, updatedBlog)
  //     const returnedBlog = await blogService.update(id, updatedBlog)
  //     // console.log(returnedBlog)
  //     setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

  //     setMessage(`you have liked ${returnedBlog.title}`)
  //     setStyle('success')
  //     setTimeout(() => {
  //       setMessage('')
  //       setStyle('')
  //     }, 1000)
  //   } catch(exception){
  //     setMessage('unable to like the blog')
  //     setStyle('error')
  //     setTimeout(() => {
  //       setMessage('')
  //       setStyle('')
  //     }, 1000)
  //   }
  // }

  // const blogDeleteHandler = async (id) => {
  //   try {
  //     await blogService.deleteBlog(id)

  //     setMessage('Successfully deleted the blog')
  //     setStyle('success')
  //     setTimeout(() => {
  //       setMessage('')
  //       setStyle('')
  //     }, 3000)
  //   }catch(exception){
  //     setMessage('unable to delete the blog')
  //     setStyle('error')
  //     setTimeout(() => {
  //       setMessage('')
  //       setStyle('')
  //     }, 3000)
  //   }
  // }

  const logoutHandle = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  if(user === null){
    return(
      <div>
        <Notification message={message} class={style} />
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
  return (
    <div>
      <Notification message={message} class={style} />
      <h2>blogs</h2>
      <p><span>{user.name}</span> logged in <button onClick={logoutHandle}>logout</button></p>
      <Togglable buttonLabel="add new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlogHandler} />
      </Togglable>
      <Blogs
        user={user}
      />
    </div>
  )
}

export default App

