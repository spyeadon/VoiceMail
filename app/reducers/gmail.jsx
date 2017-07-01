import {GMAIL_LABELS, GMAIL_MESSAGES, GMAIL_THREADS, CURRENT_LABEL, THREAD_COUNT_PER_PAGE, SET_CURRENT_THREAD, SET_CURRENT_MESSAGE} from '../action-creators/gmail.jsx'

const initialState = {
  labels: [],
  threads: {
    Inbox: { threads: [] }
  },
  currentLabel: 'Inbox',
  threadsPerPage: 10,
  currentThreadId: null,
  currentMessageId: null
}

export default function gmailReducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  const newThreads = Object.assign({}, newState.threads)

  switch (action.type) {
  case GMAIL_LABELS:
    newState.labels = action.labels
    action.labels.forEach(label => {
      newState.threads[label] = {threads: []}
    })
    return newState

  case CURRENT_LABEL:
    newState.currentLabel = action.currentLabel
    return newState

  case SET_CURRENT_THREAD:
    newState.currentThreadId = action.threadId
    return newState

  case SET_CURRENT_MESSAGE:
    newState.currentMessageId = action.threadId + action.messageId
    return newState

  case GMAIL_THREADS:
    if (newThreads[action.labelId].length) {
      newThreads[action.labelId] = newThreads[action.labelId].concat(action.threads)
    }
    else newThreads[action.labelId] = action.threads
    newState.threads = newThreads
    return newState

  case THREAD_COUNT_PER_PAGE:
    if (action.count < 1 || action.count > 30) newState.threadsPerPage = 10
    else newState.threadsPerPage = action.count
    return newState

  default:
    return state
  }
}
