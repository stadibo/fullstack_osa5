import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'

const BlogView = ({ user, logout, updateBlogs, blogs, like, remove }) => {
  return (
    <div>
      <div>
        <label htmlFor="logout"><strong>{user.name}</strong> logged in</label>
        <input id="logout" value="LOGOUT" type="button" onClick={logout} />
      </div>

      <Togglable buttonLabel="New blog">
        <BlogForm
          updateBlogs={updateBlogs}
        />
      </Togglable>

      <div>
        <h2>Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} like={like} remove={remove} user={user} />)}
      </div>
    </div>
  )
}

export default BlogView