import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginSevice from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      username: '',
      password: '',
      user: null,
      error: null,
      errorType: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  updateBlogs = (blog) => {
    this.setState({ blogs: this.state.blogs.concat(blog) })
  }

  likeBlog = async (id) => {
    //console.log('like', id)

    try {
      const blog = this.state.blogs.find(b => b.id === id)

      const updatedBlog = await blogService.update(id, {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user._id
      })

      const newBlogs = this.state.blogs.map(b => b.id === id ? updatedBlog : b)

      this.setState({ blogs: newBlogs })
    } catch (e) {
      this.setState({
        error: 'liking blog failed',
        errorType: 'f'
      })
      setTimeout(() => {
        this.setState({ error: null, errorType: null })
      }, 5000)
    }
  }

  deleteBlog = async (id) => {
    //console.log('delete', id)
    const blog = this.state.blogs.find(b => b.id === id)
    const toDelete = window.confirm(`delete '${blog.title}' by ${blog.author}?`)

    if (toDelete) {
      try {
        await blogService.remove(id)
        const newBlogs = this.state.blogs.filter(b => b.id !== id)
        this.setState({ blogs: newBlogs })
      } catch (e) {
        this.setState({
          error: 'deleting blog failed',
          errorType: 'f'
        })
        setTimeout(() => {
          this.setState({ error: null, errorType: null })
        }, 5000)
      }
    }
  }

  sortBlogs = () => {
    const sortedBlogs = this.state.blogs.sort((o1, o2) => {
      return o2.likes - o1.likes
    })
    return sortedBlogs
  }

  login = async (event) => {
    event.preventDefault()
    //console.log('logging in with', this.state.username, this.state.password)

    try {
      const user = await loginSevice.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (e) {
      this.setState({
        error: 'username or password invalid',
        errorType: 'f'
      })
      setTimeout(() => {
        this.setState({ error: null, errorType: '' })
      }, 5000)
    }

  }

  logout = () => {
    this.setState({ user: null })
    window.localStorage.removeItem('loggedBlogappUser')
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const sortedBlogs = this.sortBlogs()
    return (
      <div>
        <h1>BLOGLIST</h1>
        
        <Notification
          message={this.state.error}
          type={this.state.errorType}
        />

        {this.state.user === null ?
          <Togglable buttonLabel="Login">
            <LoginForm
              handleSubmit={this.login}
              handleChange={this.handleFieldChange}
              username={this.state.username}
              password={this.state.password}
              error={this.state.error}
              errorType={this.state.errorType}
            />
          </Togglable> :
          <BlogView
            updateBlogs={this.updateBlogs}
            logout={this.logout}
            user={this.state.user}
            blogs={sortedBlogs}
            like={this.likeBlog}
            remove={this.deleteBlog}
          />
        }
      </div>
    );
  }
}

const InputField = (props) => {
  return (
    <tr>
      <td>
        <label htmlFor={props.id}>{props.id}</label>
      </td>
      <td>
        <input
          type={props.type}
          name={props.name}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          required
        />
      </td>
    </tr>
  )
}

const Notification = ({ message, type }) => {
  if (type === 's') {
    return <p className="success">{message}</p>
  } else if (type === 'f') {
    return <p className="fail">{message}</p>
  } else {
    return null
  }
}

const LoginForm = ({ error, errorType, handleSubmit, handleChange, username, password }) => (
  <div>
    <h2>Login to view blogs</h2>

    <Notification
      message={error}
      type={errorType}
    />

    <form onSubmit={handleSubmit} className="loginForm">
      <table>
        <tbody>
          <InputField
            type="text"
            name={"username"}
            id="Username"
            value={username}
            onChange={handleChange}
          />

          <InputField
            type="password"
            name="password"
            id="Password"
            value={password}
            onChange={handleChange}
          />
        </tbody>
      </table>
      <input
        type="submit"
        value="LOGIN"
        name="submitUser"
      />
    </form>
  </div>
)

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

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newAuthor: '',
      newUrl: '',
      error: null,
      errorType: ''
    }
    this.updateBlogs = props.updateBlogs
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.newTitle,
        author: this.state.newAuthor,
        url: this.state.newUrl,
        likes: 0
      }

      const newBlog = await blogService.create(blogObject)

      this.setState({
        newTitle: '',
        newAuthor: '',
        newUrl: ''
      })

      this.updateBlogs(newBlog)

      this.setState({
        error: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
        errorType: 's'
      })
      setTimeout(() => {
        this.setState({ error: null, errorType: '' })
      }, 5000)
    } catch (e) {
      this.setState({
        error: 'adding a new blog failed',
        errorType: 'f'
      })
      setTimeout(() => {
        this.setState({ error: null, errorType: null })
      }, 5000)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <div>
          <h2>Add new blog</h2>

          <Notification
            message={this.state.error}
            type={this.state.errorType}
          />
          <form onSubmit={this.addBlog}>
            <table>
              <tbody>
                <InputField
                  type="text"
                  name="newTitle"
                  id="Title"
                  value={this.state.newTitle}
                  onChange={this.handleFieldChange}
                />

                <InputField
                  type="text"
                  name="newAuthor"
                  id="Author"
                  value={this.state.newAuthor}
                  onChange={this.handleFieldChange}
                />


                <InputField
                  type="url"
                  name="newUrl"
                  id="URL"
                  value={this.state.newUrl}
                  onChange={this.handleFieldChange}
                />

              </tbody>
            </table>

            <input
              type="submit"
              name="submitBlog"
              value="create"
            />
          </form>

        </div>
      </div>
    )
  }
}

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

export default App