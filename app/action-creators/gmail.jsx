import axios from 'axios'

export const GMAIL_LABELS = 'GMAIL_LABELS'
export const getFolderLabels = labels => ({
  type: GMAIL_LABELS,
  labels
})

export const getMessageWithLabel = label =>
  dispatch =>
    axios.get(`/api/gmail/messages/:${label}`)
    .then(res => dispatch())
    .catch(err => console.error(err))

export const getLabels = () =>
  dispatch =>
    axios.get('/api/gmail/labels')
    .then(res => dispatch(getFolderLabels(res.data)))
    .catch(err => console.error(err))
