import axios from 'axios'
import {browserHistory} from 'react-router'

const reducer = (state=null, action) => {
  switch (action.type) {
  case AUTHENTICATED:
    return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami('/login')))
      .catch(() => dispatch(whoami('/login')))

export const whoami = (redirectPage = '/mailbox') =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => dispatch(authenticated(response.data)))
      .then(() => browserHistory.push(redirectPage))
      .catch(failed => dispatch(authenticated(null)))

export default reducer
