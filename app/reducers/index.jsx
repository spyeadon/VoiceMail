import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  users: require('./users.jsx').default,
  gmail: require('./gmail.jsx').default
})

export default rootReducer
