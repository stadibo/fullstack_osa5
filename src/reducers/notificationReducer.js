export const notify = (message, status, time) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message,
        status
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_MESSAGE',
        data: {
          message: '',
          status: null
        }
      })
    }, time * 1000)
  }
}

const notification = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data
    case 'REMOVE_MESSAGE':
      return action.data
    default:
      return state
  }
}

export default notification