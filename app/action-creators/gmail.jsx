import axios from 'axios'

export const CURRENT_LABEL = 'CURRENT_LABEL'
export const setCurrentLabel = currentLabel => ({
  type: CURRENT_LABEL,
  currentLabel: currentLabel.toUpperCase()
})

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

export const GMAIL_THREADS = 'GMAIL_THREADS'
export const getGmailThreads = (threads, labelId) => ({
  type: GMAIL_THREADS,
  threads: threads,
  labelId: labelId
})

export const getMessages = options =>
  dispatch =>
    axios.post('/api/gmail/messages', options)
    .then(res => {
      const decodedData = atob(res.data[2].body.payload.parts[0].body.data)
      console.log('decoded message part data is: ', decodedData)
      dispatch(getGmailMessages(res.data))
    })
    .catch(err => console.error(err))

export const getThreads = options =>
  dispatch =>
    axios.post('/api/gmail/threads', options)
    .then(res => dispatch(getGmailThreads(res.data, res.data.labelId)))
    .catch(err => console.error(err))

export const getLabels = () =>
  dispatch =>
    axios.get('/api/gmail/labels')
    .then(res => dispatch(getFolderLabels(res.data)))
    .catch(err => console.error(err))
