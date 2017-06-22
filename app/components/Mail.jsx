import React from 'react'
import {connect} from 'react-redux'

const Mail = props => {

  // const messages = props.messages.currentLabel
  const messages = [{id: 'testID', subject: 'test Subject', body: 'test Body'}]

  return (
    <div id="mail-container">
      Test Mail Inbox, Drafts etc...
      {
        messages.map(message =>
          <div key={message.id}>
          <span>{message.subject}</span>
          <span>{message.body}</span>
          </div>
        )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    messages: state.gmail.messages,
    currentLabel: state.gmail.currentLabel,
    auth: state.auth,
  }
}

const MailContainer = connect(mapStateToProps, null)(Mail)

export default MailContainer
