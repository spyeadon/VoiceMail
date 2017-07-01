import React from 'react'
import MessageHeader from './MessageHeader.jsx'

export default function Thread(props) {

  return (
    <div className="thread">
    {props.currentThread.messages[0].headers.Subject}
    {
      props.currentThread.messages.map(message =>
          <MessageHeader
            key={message.messageId}
            openMessage={message}
            setCurrentMessage={props.setCurrentMessage}
            currentMessageId={props.currentMessageId}
            currentThreadId={props.currentThreadId}
          />
      )
    }
    </div>
  )
}
