import { useState } from 'react'

const Blog = ({ blog, blogLike, blogDelete, user }) => {
  const [isViewClicked, setIsViewClicked] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const blogDetailStyle = {
    margin: 0
  }

  const blogDeleteBtn = {
    backgroundColor: 'blue'
  }

  const toggleViewBtn = () => {
    setIsViewClicked(!isViewClicked)
  }

  const blogDetailHandler = () => {
    toggleViewBtn()
    console.log('clicked : ', isViewClicked)
  }

  const likeHandler = () => {
    const newLikes = blog.likes + 1
    blogLike(blog.id ,{
      title: blog.title,
      url: blog.url,
      likes: newLikes,
      author: blog.author,
      user: blog.user.id
    })
  }

  const blogDeleteHandler = () => {
    if (window.confirm(`Delete blog ${blog.title}! by ${blog.author}`)){
      const id = blog.id
      blogDelete(id)
    }
  }

  return(
    <div style={blogStyle} className='blogDetail'>
      <div>
        {blog.title} {blog.author} <button onClick={blogDetailHandler}>{isViewClicked ? 'hide' : 'view'}</button>
      </div>
      {
        isViewClicked ?
          <div>
            <p style={blogDetailStyle}>{blog.url} <br/>{blog.likes} <button onClick={likeHandler}>like</button> <br/> {blog.user.name}</p>
            {
              (blog.user.username === user.username) ? <button style={blogDeleteBtn} onClick={blogDeleteHandler}>delete</button> : null
            }
          </div>
          :
          null
      }
    </div>
  )
}

export default Blog