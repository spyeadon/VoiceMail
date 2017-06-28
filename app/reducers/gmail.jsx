import {GMAIL_LABELS, GMAIL_MESSAGES, GMAIL_THREADS, CURRENT_LABEL} from '../action-creators/gmail.jsx'

const initialState = {
  labels: [],
  threads: {
    Inbox: { threads: [] }
  },
  currentLabel: 'Inbox'
}

function gmailReducer(state = initialState, action) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GMAIL_LABELS:
    newState.labels = action.labels
    return newState

  case CURRENT_LABEL:
    newState.currentLabel = action.currentLabel
    return newState

  case GMAIL_THREADS:
    const newThreads = Object.assign({}, newState.threads)
    newThreads[action.labelId] = action.threads
    newState.threads = newThreads
    return newState

  default:
    return state
  }
}

export default gmailReducer
