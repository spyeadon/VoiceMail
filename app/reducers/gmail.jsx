import {GMAIL_LABELS, GMAIL_MESSAGES, GMAIL_THREADS, CURRENT_LABEL, THREAD_COUNT_PER_PAGE, SET_CURRENT_THREAD, SET_CURRENT_MESSAGE, CHANGE_THREAD_GROUP, CHANGE_MAX_THREAD_GROUPS} from '../action-creators/gmail.jsx'
import {labelSort} from '../utils.jsx'

const initialState = {
  labels: [],
  threads: {
    Inbox: {
      threads: {},
      threadGroup: 1,
      maxThreadGroup: 1
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
    newState.labels = labelSort(action.labels)
    newState.labels.forEach(label => {
      newState.threads[label] = {
        threads: {},
        threadGroup: 1,
        maxThreadGroup: 1
      }
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

  case GMAIL_THREADS:
    const aggrLabelThreads = Object.assign({}, newThreads[action.labelId].threads, action.threads.threads)
    newThreads[action.labelId] = Object.assign({}, newThreads[action.labelId], action.threads)
    newThreads[action.labelId].threads = aggrLabelThreads
    newState.threads = newThreads
    return newState

  case CHANGE_MAX_THREAD_GROUPS:
    const multiplier = (newState.threadsPerPage / Number(action.threadsPerPage))
    for (var label in newThreads) {
      newThreads[label] = Object.assign({}, newThreads[label])
      newThreads[label].threadGroup = 1
      if (newThreads[label].maxThreadGroup > 1) {
        newThreads[label].maxThreadGroup = Math.ceil(newThreads[label].maxThreadGroup * multiplier)
      }
    }
    newState.threads = newThreads
    return newState

  case CHANGE_THREAD_GROUP:
    newThreads[action.labelId] = Object.assign({}, newThreads[action.labelId])
    if (action.pageDelta === 'previous') newThreads[action.labelId].threadGroup--
    else if (action.pageDelta === 'next') newThreads[action.labelId].threadGroup++
    else if (action.pageDelta === 'firstPage') newThreads[action.labelId].threadGroup = 1
    if (newThreads[action.labelId].threadGroup > newThreads[action.labelId].maxThreadGroup) newThreads[action.labelId].maxThreadGroup = newThreads[action.labelId].threadGroup
    newState.threads = newThreads
    return newState

  case THREAD_COUNT_PER_PAGE:
    if (action.count < 1 || action.count > 30) newState.threadsPerPage = 10
    else newState.threadsPerPage = Number(action.count)
    return newState

  default:
    return state
  }
}
