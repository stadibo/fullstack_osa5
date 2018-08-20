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
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.newTitle,
        author: this.state.newTitle,
        url: this.state.newUrl,
        likes: 0
      }

      const newBlog = await blogService.create(blogObject)

      this.setState({
        notes: this.state.blogs.concat(newBlog),
        newTitle: '',
        newAuthor: '',
        newUrl: ''
      })
    } catch (e) {
      this.setState({
        error: e.message
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
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

      this.setState({
        username: '',
        password: '',
        user
      })
    } catch (e) {
      this.setState({
        error: 'username or password invalid'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }

  }

  logout = () => {
    this.setState({ user: null })
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Welcome to Bloglist</h2>

        <Notification message={this.state.error} />

        <form onSubmit={this.login}>
          <table>
            <tbody>
              <InputField
                type="text"
                name="username"
                id="Username"
                value={this.state.username}
                onChange={this.handleFieldChange}
              />

              <InputField
                type="password"
                name="password"
                id="Password"
                value={this.state.password}
                onChange={this.handleFieldChange}
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

    const blogForm = () => (
      <div>
        <h1>BLOGLIST</h1>

        <Notification message={this.state.error} />

        <div>
          <label htmlFor="logout"><strong>{this.state.user.name}</strong> logged in</label>
          <input id="logout" value="LOGOUT" type="button" onClick={this.logout} />
        </div>
        <div>
          <h2>Add new blog</h2>

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
              id="submitBlog"
            />
          </form>
        </div>
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
          loginForm() :
          blogForm()
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
        />
      </td>
    </tr>
  )
}

const Notification = ({ message }) => {
  return (
    <p>{message}</p>
  )
}

export default App;
