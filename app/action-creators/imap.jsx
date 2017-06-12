import axios from 'axios'

export const IMAP_CONNECTION = 'IMAP_CONNECTION'
export const connectViaImap = () => ({
  type: IMAP_CONNECTION
})

export const retrieveImapMessages = folder =>
  dispatch =>
    axios.get(`/api/imap/:${folder}`)
    .then(messages => dispatch(connectViaImap()))
    .catch(err => console.error(err))
