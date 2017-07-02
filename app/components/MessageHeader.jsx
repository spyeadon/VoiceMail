import React from 'react'

export default function MessageHeader(props) {

  if (props.currentThreadId === props.openMessage.threadId && props.currentMessageId === props.openMessage.messageId) {
    return (
      <div
        className="message-body"
        onClick={() => {
          if (props.currentMessageId === props.openMessage.messageId && props.currentThreadId === props.openMessage.threadId) props.setCurrentMessage()
          else props.setCurrentMessage(props.openMessage.messageId)
        }}
      >
      <span className="message-body-from-address">
        {props.openMessage.headers.From.split('<')[0]}
      </span>
      <span className="message-body-text-body">
        {props.openMessage['text/plain'] || props.openMessage['text/html']}
      </span>
    </div>
    )
  }

  return (
    <div
      className="message-header"
      onClick={() => {
        if (props.currentMessageId === props.openMessage.messageId && props.currentThreadId === props.openMessage.threadId) props.setCurrentMessage()
        else props.setCurrentMessage(props.openMessage.messageId)
      }}
    >
      <span className="message-header-from-address">
        {props.openMessage.headers.From.split('<')[0]}
      </span>
      <span className="message-header-snippet">
        {props.openMessage.snippet}
      </span>
    </div>
  )
}
