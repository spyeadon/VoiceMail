import React from 'react'

export default function MessageHeader(props) {

  if (props.currentThreadId === props.openMessage.threadId && props.currentMessageId === props.openMessage.messageId) {
    return (
      <div
        className="message-container"
        onClick={() => {
          if (props.currentMessageId === props.openMessage.messageId && props.currentThreadId === props.openMessage.threadId) props.setCurrentMessage()
          else props.setCurrentMessage(props.currentThreadId, props.openMessage.messageId)
        }}
      >
      {props.openMessage.headers.From.split('<')[0]}
      {props.openMessage['text/plain']}
    </div>
    )
  }

  return (
    <div
      className="message-header"
      onClick={() => {
        if (props.currentMessageId === props.openMessage.messageId && props.currentThreadId === props.openMessage.threadId) props.setCurrentMessage()
        else props.setCurrentMessage(props.currentThreadId, props.openMessage.messageId)
      }}
    >
      {props.openMessage.headers.From.split('<')[0]}
      {props.openMessage.snippet}
    </div>
  )
}
