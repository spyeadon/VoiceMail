import {GET_USERLIST} from '../action-creators/users.jsx'

const initialState = {
  userList: []
}

const users = (state=initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_USERLIST:
    newState.userList = action.userList;
    return newState;

  default:
    return state;
  }
}

export default users;
