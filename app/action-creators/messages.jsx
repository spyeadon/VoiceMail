import axios from 'axios';

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

export const CURRENT_MESSAGE = 'CURRENT_MESSAGE';
export const selectMessage = currentMessage => ({
  type: CURRENT_MESSAGE,
  currentMessage: currentMessage
})
