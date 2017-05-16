import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  messages: require('./messages.jsx').default
})

export default rootReducer
