import {GMAIL_LABELS, GMAIL_MESSAGES, GMAIL_THREADS, CURRENT_LABEL, THREAD_COUNT_PER_PAGE} from '../action-creators/gmail.jsx'

const initialState = {
  labels: [],
  threads: {
    Inbox: { threads: [] }
  },
  currentLabel: 'Inbox',
  threadsPerPage: 10
}

function gmailReducer(state = initialState, action) {
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

  case GMAIL_THREADS:
    if (newThreads[action.labelId].length) newThreads[action.labelId] = newThreads[action.labelId].concat(action.threads)
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

export default gmailReducer
