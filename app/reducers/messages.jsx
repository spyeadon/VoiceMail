import {GET_MESSAGES, CURRENT_MESSAGE, UPDATE_MESSAGE, CREATE_MESSAGE, DELETE_MESSAGE, CHANGE_FOLDER} from '../action-creators/messages.jsx'

const initialState = {
  messages: [],
  currentMessage: {},
  currentFolder: 'Inbox',
  folders: [
    'Inbox',
    'Drafts',
    'Sent Mail',
    'Important',
    'Spam',
    'Trash'
  ]
}

const messages = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  let updatedMessages;

  switch (action.type) {
  case GET_MESSAGES:
    newState.messages = action.messages;
    return newState;

  case CURRENT_MESSAGE:
    newState.currentMessage = action.currentMessage;
    return newState;

  case UPDATE_MESSAGE:
    updatedMessages = newState.messages.map(msg => {
      if (msg.id === action.updatedMessage.id) return action.updatedMessage;
      else return msg;
    })
    newState.messages = updatedMessages;
    return newState;

  case DELETE_MESSAGE:
    updatedMessages = newState.messages.filter( msg => {
      return msg.id !== action.msgToDelete.id
    })
    newState.messages = updatedMessages;
    return newState;

  case CREATE_MESSAGE:
    updatedMessages = newState.messages.slice();
    updatedMessages.unshift(action.newMessage)
    newState.messages = updatedMessages;
    return newState;

  case CHANGE_FOLDER:
    newState.currentFolder = action.currentFolder;
    return newState;

  default:
    return state;
  }
}

export default messages;
