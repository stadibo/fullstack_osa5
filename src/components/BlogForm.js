import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import InputField from './InputField'

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

export default BlogForm