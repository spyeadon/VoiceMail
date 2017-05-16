import {GET_MESSAGES, CURRENT_MESSAGE} from '../action-creators/messages.jsx'

const initialState = {
  messages: [],
  currentMessage: {}
}

const messages = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
  case GET_MESSAGES:
    newState.messages = action.messages;
    return newState;

  case CURRENT_MESSAGE:
    newState.currentMessage = action.currentMessage;
    return newState;

  default:
    return state;
  }
}

export default messages;
