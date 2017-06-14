import axios from 'axios'

export const GMAIL_LABELS = 'GMAIL_LABELS'
export const getFolderLabels = labels => ({
  type: GMAIL_LABELS,
  labels
})

export const GMAIL_MESSAGES = 'GMAIL_MESSAGES'
export const getGmailMessages = messages => ({
  type: GMAIL_MESSAGES,
  messages
})

export const getMessages = options =>
  dispatch =>
    axios.post('/api/gmail/messages', options)
    .then(res => dispatch(getGmailMessages(res.data)))
    .catch(err => console.error(err))

export const getLabels = () =>
  dispatch =>
    axios.get('/api/gmail/labels')
    .then(res => dispatch(getFolderLabels(res.data)))
    .catch(err => console.error(err))
