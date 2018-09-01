import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { updateBlog, removeBlog } from '../reducers/blogsReducer'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
    }
  }

  likeBlog = async (id) => {
    //console.log('like', id)
    try {
      const blog = this.props.blog
      const updatedBlog = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
        user: blog.user._id
      })

      this.props.updateBlog(updatedBlog)
    } catch (e) {
      this.props.notify('liking blog failed', 'f', 5)
    }
  }

  deleteBlog = async (id) => {
    //console.log('delete', id)
    const toDelete = window.confirm(`delete '${this.props.blog.title}' by ${this.props.blog.author}?`)

    if (toDelete) {
      try {
        await blogService.remove(id)
        this.props.removeBlog(id)
      } catch (e) {
        this.props.notify('deleting blog failed', 'f', 5)
      }
    }
  }

  expandBlog = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible} className="expandedBlog">
          <ExpandedBlog
            key={this.props.blog.id}
            blog={this.props.blog}
            like={this.likeBlog}
            expandBlog={this.expandBlog.bind(this)}
            remove={this.deleteBlog}
            user={this.props.user}
          />
        </div>
        <div style={showWhenVisible} className="simpleBlog" >
          <SimpleBlog
            key={this.props.blog.id}
            blog={this.props.blog}
            expandBlog={this.expandBlog.bind(this)}
          />
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

const ExpandedBlog = ({ blog, like, remove, expandBlog, user }) => {
  const likeBlog = (id) => () => like(id)
  const deleteBlog = (id) => () => remove(id)
  const showDelete = () => {
    if (blog.user) {
      if (blog.user.username === user.username) {
        return <button onClick={deleteBlog(blog.id)}>Delete blog</button>
      } else {
        return <p></p>
      }
    } else {
      return <button onClick={deleteBlog(blog.id)}>Delete blog</button>
    }
  }
  let addedBy = blog.user ? <p>added by {blog.user.name}</p> : <p></p>
  
  //render this
  return (
    <div className="blogNode">
      <div className="expBlogInfo">
        <p onClick={expandBlog}>{blog.title} | {blog.author}</p>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {addedBy}
        </div>
      </div>
      <div>
        <p>{blog.likes} likes</p>
        <button className="blogNodeButton" onClick={likeBlog(blog.id)}>Like</button>
      </div>
      {showDelete()}
    </div>
  )
}

const SimpleBlog = ({ blog, expandBlog }) => {
  return (
    <div className="blogNode">
      <p className="simpBlogInfo" onClick={expandBlog}>{blog.title} | {blog.author}</p>
    </div>
  )
}

export default connect(
  null,
  { notify, removeBlog, updateBlog }
)(Blog)