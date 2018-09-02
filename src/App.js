import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import blogService from './services/blogs'
//import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'
import UserView from './components/UserView'
import Blog from './components/Blog'
import { connect } from 'react-redux'
import { removeUser, setUser } from './reducers/loggedInReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initializeBlogs()
    this.props.initializeUsers()
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      this.props.setUser(user)
      console.log('mounting', user)
    }
  }

  logout = () => {
    this.props.removeUser()
    window.localStorage.removeItem('loggedBlogappUser')
  }

  blogById = (id) => {
    return this.props.blogs.find(b => b.id === id)
  }

  render() {
    console.log('app render')
    return (
      <div>
        <h1>BLOG APP</h1>
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() =>
              this.props.user
                ? <Redirect to="/blogs" />
                : <Redirect to="/login" />
            } />
            <Route exact path="/blogs" render={() => <BlogView logout={this.logout} />} />
            <Route exact path="/users" render={() => <UserView logout={this.logout} />} />
            <Route exact path="/login" render={({ history }) => <LoginForm history={history} />} />
            <Route exact path="/blogs/:id" render={({ match }) => <Blog blog={this.blogById(match.params.id)} />} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedIn,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { removeUser, initializeBlogs, initializeUsers, setUser }
)(App)