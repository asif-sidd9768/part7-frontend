import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    likeBlogRed (state, action) {
      console.log('action == ', action.payload)
      const [ id, updatedBlog ] = action.payload
      // const blogToLike = state.find(n => n.id === id)
      // const likedBlog = { ...blogToLike, likes: blogToLike + 1 }
      // console.log('liked === ', updatedBlog)
      return state.map( blog => blog.id !== id ? blog : updatedBlog )
    },
    setBlogs (state, action) {
      return action.payload
    },
    appendBlog (state, action) {
      state.push(action.payload)
    }
  }
})

export const { setBlogs, appendBlog, likeBlogRed } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id, updatedBlog) => {
  return async dispatch => {
    console.log('id === ', id)
    console.log('blog === ', updatedBlog)
    console.log(`ids == ${id} - ${updatedBlog.id}`)
    await blogService.update(id, updatedBlog)
    dispatch(likeBlogRed([ id, updatedBlog]))
  }
}

export default blogSlice.reducer