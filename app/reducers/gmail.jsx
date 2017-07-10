import {GMAIL_LABELS, GMAIL_MESSAGES, GMAIL_THREADS, CURRENT_LABEL, THREAD_COUNT_PER_PAGE, SET_CURRENT_THREAD, SET_CURRENT_MESSAGE} from '../action-creators/gmail.jsx'

const initialState = {
  labels: [],
  threads: {
    Inbox: {
      threads: {},
      threadGroup: 1
    }
  },
  currentLabel: 'Inbox',
  threadsPerPage: 20,
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
      newState.threads[label] = {threads: {}, threadGroup: 1}
    })
    return newState

  case CURRENT_LABEL:
    newState.currentLabel = action.currentLabel
    return newState

  case SET_CURRENT_THREAD:
    newState.currentThreadId = action.threadId
    return newState

  case SET_CURRENT_MESSAGE:
    newState.currentMessageId = action.messageId
    return newState

  //will need to refactor so the NextPageToken is overwritten only if the previous NPT was used to fetch this new batch of threads
  case GMAIL_THREADS:
    newThreads[action.labelId] = Object.assign({}, newThreads[action.labelId], action.threads)
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
