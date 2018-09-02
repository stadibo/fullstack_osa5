export const setUser = (data) => {
  return (dispatch) => {
    console.log('logging in')
    dispatch({
      type: 'LOGIN',
      data
    })
  }
}

export const removeUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}

const loggedIn = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return action.data
    default:
      return state
  }
}

export default loggedIn