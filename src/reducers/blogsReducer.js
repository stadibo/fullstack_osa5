import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createBlog = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: {
        id
      }
    })
  }
}

export const updateBlog = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'UPDATE_BLOG',
      data
    })
  }
}

const blogs = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return state.concat(action.data)
    case 'REMOVE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    case 'UPDATE_BLOG':
      return state.map(b => b.id !== action.data.id ? b : action.data)
    default:
      return state
  }
}

export default blogs