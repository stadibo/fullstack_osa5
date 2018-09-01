import React from 'react'
import BlogForm from './BlogForm'
import Meny from './Meny'
import Togglable from './Togglable'
import Blog from './Blog'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const BlogView = ({ user, blogs, logout }) => {
  return user
    ? (<div>
      <Meny user={user} logout={logout} />

      <Togglable buttonLabel="New blog">
        <BlogForm />
      </Togglable>

      <div>
        <h2>Blogs</h2>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} />)}
      </div>
    </div>)
    : <Redirect to="/login" />
}

const sortBlogs = (blogs) => {
  const sortedBlogs = blogs.sort((o1, o2) => {
    return o2.likes - o1.likes
  })
  return sortedBlogs
}

const mapStateToProps = (state) => {
  return {
    blogs: sortBlogs(state.blogs),
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps
)(BlogView)