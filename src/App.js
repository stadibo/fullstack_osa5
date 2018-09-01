import React from 'react'
import blogService from './services/blogs'
import loginSevice from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      error: null,
      errorType: ''
    }
  }

  componentDidMount() {
    this.props.initializeBlogs()
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
      this.props.notify('username or password invalid', 'f', 5)
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
    return (
      <div>
        <h1>BLOGLIST</h1>

        {this.state.user === null ?
          <Togglable buttonLabel="Login">
            <LoginForm
              handleSubmit={this.login}
              handleChange={this.handleFieldChange}
              username={this.state.username}
              password={this.state.password}
            />
          </Togglable> :
          <BlogView
            logout={this.logout}
            user={this.state.user}
          />
        }
      </div>
    );
  }
}

export default connect(
  null,
  { notify, initializeBlogs }
)(App)