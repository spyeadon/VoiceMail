import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  gmail: require('./gmail.jsx').default
})

export default rootReducer
