import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      //console.log(app.html())
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when user is logged in', () => {
    beforeEach(() => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(blogService.blogs[0].user))

      app = mount(<App />)
    })

    it('test', () => {
      app.update()
      //console.log(app.html())
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })


})