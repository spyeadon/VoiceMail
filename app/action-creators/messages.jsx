import axios from 'axios';

export const CURRENT_MESSAGE = 'CURRENT_MESSAGE';
export const selectMessage = currentMessage => ({
  type: CURRENT_MESSAGE,
  currentMessage: currentMessage
})

export const GET_MESSAGES = 'GET_MESSAGES';
export const userMessages = messages => ({
  type: GET_MESSAGES,
  messages: messages
})

export const retrieveUserMessages = userId =>
  dispatch =>
    axios.get(`/api/messages/${userId}`)
    .then(res => dispatch(userMessages(res.data)))
    .catch(err => console.error(err))

export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'
export const modifyMessage = updatedMessage => ({
  type: UPDATE_MESSAGE,
  updatedMessage: updatedMessage
})

export const updateMessage = updatedMsg =>
  dispatch =>
    axios.put(`/api/messages/${updatedMsg.id}`, {updatedMsg})
    .then(res => dispatch(modifyMessage(res.data)))
    .catch(err => console.error(err))

export const CREATE_MESSAGE = 'CREATE_MESSAGE'
export const addMsgToDB = newMessage => ({
  type: CREATE_MESSAGE,
  newMessage: newMessage
})

export const createMessage = (newMessage, userId) =>
  dispatch =>
    axios.post(`/api/messages/${userId}`, {newMessage})
    .then(res => {
      dispatch(addMsgToDB(res.data))
      console.log(res.status)
    })
    .catch(err => console.error(err))

export const DELETE_MESSAGE = 'DELETE_MESSAGE'
export const deleteMsgFromDB = msgToDelete => ({
  type: DELETE_MESSAGE,
  msgToDelete: msgToDelete
})

export const deleteMessage = message =>
  dispatch =>
    axios.delete(`/api/messages/${message.id}`)
    .then(res => console.log(res.status))
    .then(() => dispatch(deleteMsgFromDB(message)))
    .catch(err => console.error(err))

export const CHANGE_FOLDER = 'CHANGE_FOLDER'
export const changeFolder = currentFolder => ({
  type: CHANGE_FOLDER,
  currentFolder: currentFolder
})
