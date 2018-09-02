import React from 'react'
import blogService from '../services/blogs'
import loginSevice from '../services/login'
import Notification from './Notification'
import InputField from './InputField'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loggedInReducer'
import { initializeBlogs } from '../reducers/blogsReducer'
import { initializeUsers } from '../reducers/usersReducer'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      blogService.setToken(user.token)
      this.props.setUser(user)
      this.props.history.push('/blogs')
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
      this.props.setUser(user)
      this.setState({
        username: '',
        password: ''
      })

      this.props.history.push('/blogs')
    } catch (e) {
      this.props.notify('username or password invalid', 'f', 5)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log('login')
    return (
      <div>
        <h2>Login to view blogs</h2>

        <Notification />

        <form onSubmit={this.login} className="loginForm">
          <table>
            <tbody>
              <InputField
                type="text"
                name={"username"}
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
  }
}

export default connect(
  null,
  { notify, setUser, initializeBlogs, initializeUsers }
)(LoginForm)