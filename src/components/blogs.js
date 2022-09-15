import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
// import { likeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  //sorting blogs based on likes
  const sortedBlogs = [...blogs]
  sortedBlogs.sort(function(a, b) {
    var keyA = a.likes, keyB = b.likes
    if (keyA > keyB) return -1
    if (keyA < keyB) return 1
    return 0
  })

  // const blogLikeHandler = async (id, updatedBlog) => {
  //   try{
  //     dispatch(likeBlog(id, updatedBlog))
  //     // const returnedBlog = await blogService.update(id, updatedBlog)
  //     // sortedBlogs.map(blog => blog.id !== id ? blog : returnedBlog)
  //     console.log('real state ====  ', store.getState())
  //     dispatch(setNotification(`you have liked ${updatedBlog.title}`, 'success', 3))
  //   } catch(exception){
  //     dispatch(setNotification('unable to like the blog', 'error', 2))
  //   }
  // }

  const blogDeleteHandler = async (id) => {
    try {
      await blogService.deleteBlog(id)
      dispatch(setNotification('Successfully deleted the blog'))
    }catch(exception){
      dispatch(setNotification('unable to delete the blog'))
    }
  }

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog user={user} blogDelete={blogDeleteHandler} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs