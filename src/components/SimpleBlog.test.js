import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
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
    expect(likesDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  it('clickHandler for likes registers right amount of clicks', () => {
    const blog = {
      title: 'My fantastic blog',
      author: 'Me and only me',
      likes: 5
    }
    
    const mockHandler = jest.fn()
    
    const blogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})