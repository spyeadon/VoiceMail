import axios from 'axios'

export const CURRENT_LABEL = 'CURRENT_LABEL'
export const setCurrentLabel = currentLabel => ({
  type: CURRENT_LABEL,
  currentLabel: currentLabel
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

export const THREAD_COUNT_PER_PAGE = 'THREAD_COUNT_PER_PAGE'
export const setPageThreadCount = count => ({
  type: THREAD_COUNT_PER_PAGE,
  count: count
})

export const SET_CURRENT_THREAD = 'SET_CURRENT_THREAD'
export const setCurrentThreadId = (threadId = null) => ({
  type: SET_CURRENT_THREAD,
  threadId
})

export const SET_CURRENT_MESSAGE = 'SET_CURRENT_MESSAGE'
export const setCurrentMessageId = (messageId = null) => ({
  type: SET_CURRENT_MESSAGE,
  messageId: messageId
})

export const CHANGE_THREAD_GROUP = 'CHANGE_THREAD_GROUP'
export const changeThreadGroup = (pageDelta, labelId) => ({
  type: CHANGE_THREAD_GROUP,
  pageDelta,
  labelId
})

export const CHANGE_MAX_THREAD_GROUPS = 'CHANGE_MAX_THREAD_GROUPS'
export const changeMaxThreadGroups = threadsPerPage => ({
  type: CHANGE_MAX_THREAD_GROUPS,
  threadsPerPage: threadsPerPage
})

export const getMessages = options =>
  dispatch =>
    axios.post('/api/gmail/messages', options)
    .then(res => dispatch(getGmailMessages(res.data)))
    .catch(err => console.error(err))

export const getThreads = (options, token = true) =>
  dispatch =>
    axios.post('/api/gmail/threads', {options, token})
    .then(res => dispatch(getGmailThreads(res.data, res.data.labelId)))
    .then(() => dispatch(setCurrentThreadId()))
    .then(() => dispatch(setCurrentMessageId()))
    .then(() => dispatch(setCurrentLabel(options.labelIds)))
    .catch(err => console.error(err))

export const getLabels = () =>
  dispatch =>
    axios.get('/api/gmail/labels')
    .then(res => dispatch(getFolderLabels(res.data)))
    .catch(err => console.error(err))
