import React from 'react'
import { mount } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  describe('clicking name of blog reveals more info', () => {
    const blog = {
      title: 'My fantastic blog',
      author: 'Me and only me',
      url: 'http://fullstackopen.github.io',
      likes: 5,
      id: 123,
      user: {
        _id: "007",
        username: 'tester'
      }
    }

    const user = {
      username: 'tester'
    }

    const mockLike = jest.fn()
    const mockRemove = jest.fn()


    const blogComponent = mount(
      <Blog
      blog={blog}
      user={user}
      like={mockLike}
      remove={mockRemove}
      />
    )
  
    it('before click only displays title and auhtor', () => {
      const div = blogComponent.find('.simpleBlog')
      const expDiv = blogComponent.find('.expandedBlog')
      
      expect(div.text()).toContain(blog.title)
      expect(div.text()).toContain(blog.author)
      expect(div.text()).not.toContain(blog.likes)
      expect(expDiv.getElement().props.style).toEqual({ display: 'none' })
    })

    it('after click displays expanded info', () => {
      const blogInfo = blogComponent.find('.simpBlogInfo')
      blogInfo.simulate('click')
      
      const div = blogComponent.find('.simpleBlog')
      const expDiv = blogComponent.find('.expandedBlog')
      
      expect(expDiv.text()).toContain(blog.title)
      expect(expDiv.text()).toContain(blog.author)
      expect(expDiv.text()).toContain(blog.url)
      expect(expDiv.text()).toContain(blog.likes)
      expect(div.getElement().props.style).toEqual({ display: 'none' })
    })
  
  })
})