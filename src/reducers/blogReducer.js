import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    likeBlogRed (state, action) {
      const [ id, updatedBlog ] = action.payload
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

    // "title": "Oogie boogie boo",
    // "url": "asifsiddique.in/blogs",
    // "likes": 10,
    // "author": "Maddy Keddy",
    // "user": "630a244692ec9e2f845260cd"
    const blogToUpdate = {
      title: updatedBlog.title,
      url: updatedBlog.url,
      likes: updatedBlog.likes,
      author: updatedBlog.author,
      user: updatedBlog.user.id
    }

    console.log('id === ', id)
    console.log('blog === ', updatedBlog)
    console.log(`ids == ${id} - ${updatedBlog.id}`)
    await blogService.update(id, blogToUpdate)
    dispatch(likeBlogRed([ id, updatedBlog]))
  }
}

export default blogSlice.reducer