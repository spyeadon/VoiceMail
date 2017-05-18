import axios from 'axios'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const sendMessageSG = () => ({
  type: SEND_MESSAGE
})

export const sendAudioMessage = message =>
  dispatch =>
    axios.post('/api/sendgrid/audio', {message})
    .then(res => dispatch(sendMessageSG()))
    .catch(err => console.error(err))

export const sendTextMessage = message =>
  dispatch =>
    axios.post('/api/sendgrid/text', {message})
    .then(res => dispatch(sendMessageSG()))
    .catch(err => console.error(err))
