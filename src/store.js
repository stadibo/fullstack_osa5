import { createStore, combineReducers, applyMiddleware } from 'redux'
import notification from './reducers/notificationReducer'
import blogs from './reducers/blogsReducer'
import loggedIn from './reducers/loggedInReducer'
import users from './reducers/usersReducer'
import thunk from 'redux-thunk'

const appReducers = combineReducers({
  notification,
  blogs,
  loggedIn,
  users
})

const store = createStore(
  appReducers,
  applyMiddleware(thunk)
)

export default store