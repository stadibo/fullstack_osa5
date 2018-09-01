import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import InputField from './InputField'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

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

      this.props.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`, 's', 5)
    } catch (e) {
      this.props.notify('adding a new blog failed', 'f', 5)
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

export default connect(
  null,
  { notify }
)(BlogForm)