import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders blog info', () => {
    const blog = {
      title: 'My fantastic blog',
      author: 'Me and only me',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const blogDiv = blogComponent.find('.blog')
    const likesDiv = blogComponent.find('.likeAmount')

    expect(blogDiv.text()).toContain(blog.title)
    expect(blogDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })
})