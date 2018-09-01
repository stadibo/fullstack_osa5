import React from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import Blog from './Blog'
import { connect } from 'react-redux';

const BlogView = ({ user, logout, updateBlogs, blogs, like, remove }) => {
  return (
    <div>
      <div>
        <label htmlFor="logout"><strong>{user.name}</strong> logged in</label>
        <input id="logout" value="LOGOUT" type="button" onClick={logout} />
      </div>

      <Togglable buttonLabel="New blog">
        <BlogForm />
      </Togglable>

      <div>
        <h2>Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} />)}
      </div>
    </div>
  )
}

const sortBlogs = (blogs) => {
  const sortedBlogs = blogs.sort((o1, o2) => {
    return o2.likes - o1.likes
  })
  return sortedBlogs
}

const mapStateToProps = (state) => {
  return {
    blogs: sortBlogs(state.blogs)
  }
}

export default connect(
  mapStateToProps
)(BlogView)