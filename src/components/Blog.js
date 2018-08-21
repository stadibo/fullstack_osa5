import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: true
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
        <div style={hideWhenVisible}>
          <ExpandedBlog
            key={this.props.blog.id}
            blog={this.props.blog}
            like={this.props.like}
            expandBlog={this.expandBlog.bind(this)}
            remove={this.props.remove}
            user={this.props.user}
          />
        </div>
        <div style={showWhenVisible}>
          <SimpleBlog
            key={this.props.blog.id}
            blog={this.props.blog}
            expandBlog={this.expandBlog.bind(this)}
            remove={this.props.remove}
          />
        </div>
      </div>
    )
  }
}

const ExpandedBlog = ({ blog, like, remove, expandBlog, user }) => {
  const likeBlog = (id) => () => like(id)
  const deleteBlog = (id) => () => remove(id)
  const showDelete = () => {
    if (blog.user) {
      if (blog.user.username === user.username) {
        return <button onClick={deleteBlog(blog.id)}>Delete blog</button>
      }
    } else {
      return <p></p>
    }
  }
  let addedBy = blog.user ? <p>added by {blog.user.name}</p> : <p></p>
  return (
    <div className="blogNode">
      <div>
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

const SimpleBlog = ({ blog, expandBlog, remove }) => {
  return <p className="blogNode" onClick={expandBlog}>{blog.title} | {blog.author}</p>
}

export default Blog