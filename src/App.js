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

  likeBlog = (id) => {

  }

  deleteBlog = (id) => {

  }

  login = async (event) => {
    event.preventDefault()
    console.log('logging in with', this.state.username, this.state.password)

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

    const blogView = () => (
      <div>
        <h1>BLOGLIST</h1>

        <div>
          <label htmlFor="logout"><strong>{this.state.user.name}</strong> logged in</label>
          <input id="logout" value="LOGOUT" type="button" onClick={this.logout} />
        </div>

        <BlogForm
          handleBlogs={this.updateBlogs.bind(this)}
        />

        <div>
          <h2>Blogs</h2>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )

    return (
      <div>

        {this.state.user === null ?
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password}
            error={this.state.error}
            errorType={this.state.errorType}
          /> :
          blogView()

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
    <h2>Welcome to Bloglist</h2>

    <Notification
      message={error}
      type={errorType}
    />

    <form onSubmit={handleSubmit}>
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
    this.handleBlogs = props.handleBlogs
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

      this.handleBlogs(newBlog)

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

export default App;



  // addBlog = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const blogObject = {
  //       title: this.state.newTitle,
  //       author: this.state.newAuthor,
  //       url: this.state.newUrl,
  //       likes: 0
  //     }

  //     const newBlog = await blogService.create(blogObject)

  //     this.setState({
  //       blogs: this.state.blogs.concat(newBlog),
  //       newTitle: '',
  //       newAuthor: '',
  //       newUrl: ''
  //     })
  //     this.setState({
  //       error: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
  //       errorType: 's'
  //     })
  //     setTimeout(() => {
  //       this.setState({ error: null, errorType: null })
  //     }, 5000)
  //   } catch (e) {
  //     this.setState({
  //       error: 'adding a new blog failed',
  //       errorType: 'f'
  //     })
  //     setTimeout(() => {
  //       this.setState({ error: null, errorType: null })
  //     }, 5000)
  //   }
  // }



/* <div>
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
</div> */