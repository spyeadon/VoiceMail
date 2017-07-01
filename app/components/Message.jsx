import React from 'react'

export default function Message(props) {

  return (
    <div className="message-container">
      Message Body is: {props.openMessage['text/plain']}
    </div>
  )
}
