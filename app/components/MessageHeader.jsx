import React from 'react'

export default function MessageHeader(props) {

  return (
    <div className="message-header">
      {props.openMessage.headers.From.split('<')[0]}
      {props.openMessage.snippet}
    </div>
  )
}
