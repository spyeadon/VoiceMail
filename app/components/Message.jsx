import React from 'react'

export default function Message(props) {

  if (props.currentThreadId === props.openMessage.threadId && props.currentMessageId === props.openMessage.messageId) {
    return (
      <div
        className="message-body"
        onClick={() => {
          if (props.currentMessageId === props.openMessage.messageId && props.currentThreadId === props.openMessage.threadId) props.setCurrentMessage()
          else props.setCurrentMessage(props.openMessage.messageId)
        }}>
      <span className="message-body-from-address">
        {props.openMessage.headers.From.split('<')[0] || props.openMessage.headers['Return-Path']}
      </span>
      <br />
      <span className="message-body-text-body">
        {props.openMessage['text/plain'] || props.openMessage['text/html']}
      </span>
      <hr />
    </div>
    )
  }

  return (
    <div
    className="message-header"
    onClick={() => {
      if (props.currentMessageId === props.openMessage.messageId && props.currentThreadId === props.openMessage.threadId) props.setCurrentMessage()
      else props.setCurrentMessage(props.openMessage.messageId)
    }}>
      <span className="message-header-from-address">
        {props.openMessage.headers.From.split('<')[0] || props.openMessage.headers['Return-Path']}
      </span>
      <br />
      <span className="message-header-snippet">
        {props.openMessage.snippet}
      </span>
      <hr />
    </div>
  )
}
