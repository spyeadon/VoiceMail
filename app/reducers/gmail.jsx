import {GMAIL_LABELS, GMAIL_MESSAGES, GMAIL_THREADS, CURRENT_LABEL} from '../action-creators/gmail.jsx'

const initialState = {labels: []}

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
    newState.messages = action.threads
    return newState

  default:
    return state
  }
}

export default gmailReducer
