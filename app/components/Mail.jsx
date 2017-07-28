import React from 'react'
import {connect} from 'react-redux'
import Thread from './Thread.jsx'
import {setCurrentThreadId, setCurrentMessageId, changeThreadGroup, getThreads} from '../action-creators/gmail.jsx'
import {threadsToRender} from '../utils.jsx'

const Mail = props => {

  const currentThreads = props.threads[props.currentLabel]
  const threads = threadsToRender(
    currentThreads.threads,
    props.numThreads,
    currentThreads.threadGroup
  )
  const style = {
    backgroundColor: '#ededed',
    borderLeft: '3px solid black'
  }

  if (!threads.length && !props.mailLoading) {
    return <div id="empty-label" />
  }
  if (!threads.length || props.mailLoading) {
    return <div id="mail-loading-container" />
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
            {props.currentThreadId === thread.threadId ?
              <span style={style} className="threads-from-address">
                {thread.messages[0].headers.From.split('<')[0] || thread.messages[0].headers['Return-Path']}
              </span> :
              <span className="threads-from-address">
                {thread.messages[0].headers.From.split('<')[0] || thread.messages[0].headers['Return-Path']}
              </span>
            }
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
    currentThreadId: state.gmail.currentThreadId,
    currentMessageId: state.gmail.currentMessageId,
    numThreads: state.gmail.threadsPerPage,
    mailLoading: state.gmail.mailLoading
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
