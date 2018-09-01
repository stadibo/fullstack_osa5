import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import InputField from './InputField'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogsReducer'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newTitle: '',
      newAuthor: '',
      newUrl: ''
    }
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
      const data = await blogService.create(blogObject)
      this.props.createBlog(data)
      this.setState({
        newTitle: '',
        newAuthor: '',
        newUrl: ''
      })
      this.props.notify(`a new blog '${data.title}' by ${data.author} added`, 's', 5)
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

          <Notification />

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
  { createBlog, notify }
)(BlogForm)