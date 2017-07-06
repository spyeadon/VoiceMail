import React from 'react'
import Message from './Message.jsx'

export default function Thread(props) {

  return (
    <div className="thread">
    <span
      onClick={() => props.setCurrentThread()}
      className="thread-subject-line">
      {props.currentThread.messages[0].headers.Subject}
    </span>
    <hr />
    {
      props.currentThread.messages.map(message =>
        <Message
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
