import Blog from './Blog'

const Blogs = ({ blogs, user, blogDeleteHandler, blogLikeHandler }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog user={user} blogDelete={blogDeleteHandler} blogLike={blogLikeHandler} key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Blogs