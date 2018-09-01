import { createStore, combineReducers, applyMiddleware } from 'redux'
import notification from './reducers/notificationReducer'
import thunk from 'redux-thunk'

const appReducers = combineReducers({
  notification
})

const store = createStore(
  appReducers,
  applyMiddleware(thunk)
)

export default store