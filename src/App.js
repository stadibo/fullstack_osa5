import React from 'react'
import blogService from './services/blogs'
import loginSevice from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogView from './components/BlogView'

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

export default App