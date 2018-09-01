import React from 'react'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser, removeUser } from './reducers/loggedInReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      
      blogService.setToken(user.token)
      this.props.setUser(user)
    }
  }

  logout = () => {
    this.props.removeUser()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  render() {
    return (
      <div>
        <h1>BLOGLIST</h1>

        {this.props.user === null ?
          <Togglable buttonLabel="Login">
            <LoginForm />
          </Togglable> :
          <BlogView
            logout={this.logout}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedIn
  }
}

export default connect(
  mapStateToProps,
  { initializeBlogs, setUser, removeUser }
)(App)