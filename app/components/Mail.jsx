import React from 'react'
import {connect} from 'react-redux'
import Thread from './Thread.jsx'
import {setCurrentThreadId, setCurrentMessageId} from '../action-creators/gmail.jsx'

const Mail = props => {

  const threads = props.threads[props.currentLabel].threads

  if (!props.threads[props.currentLabel].threads.length) {
    return <div id="mail-loading-container">Mail Loading...</div>
  }
  return (
    <div id="mail-container">
      {
        threads.map(thread =>
        <div className="threads-container" key={thread.threadId} >
          <div
            className="threads-LI"
            onClick={() => {
              if (props.currentThreadId === thread.threadId){
                props.setCurrentThread()
                props.setCurrentMessage()
              }
              else {
                props.setCurrentThread(thread.threadId)
                props.setCurrentMessage()
              }
            }}>
            <span className="threads-from-address">
              {thread.messages[0].headers.From.split('<')[0]}
            </span>
            <span className="threads-subject-line">
              {thread.messages[0].headers.Subject} &mdash;
            </span>
            <span className="threads-snippet">
              {thread.snippet}
            </span>
            <hr />
          </div>
          {props.currentThreadId === thread.threadId ?
            <Thread
              currentThread={thread}
              currentThreadId={props.currentThreadId}
              setCurrentThread={props.setCurrentThread}
              setCurrentMessage={props.setCurrentMessage}
              currentMessageId={props.currentMessageId}
            />
            : null
          }
        </div>
        )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    threads: state.gmail.threads,
    currentLabel: state.gmail.currentLabel,
    auth: state.auth,
    currentThreadId: state.gmail.currentThreadId,
    currentMessageId: state.gmail.currentMessageId
  }
}

function mapStateToDispatch(dispatch) {
  return {
    setCurrentThread(threadId = null) {
      dispatch(setCurrentThreadId(threadId))
    },
    setCurrentMessage(messageId = null) {
      dispatch(setCurrentMessageId(messageId))
    }
  }
}

const MailContainer = connect(mapStateToProps, mapStateToDispatch)(Mail)

export default MailContainer
