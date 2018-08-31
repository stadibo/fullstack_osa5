const notification = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return state
    case 'REMOVE_MESSAGE':
      return state
    default:
      return state
  }
}