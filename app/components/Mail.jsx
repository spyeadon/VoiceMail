import React from 'react'
import {connect} from 'react-redux'
import filterByFolder from '../utils.jsx'

const Mail = props => {

  const messages = []

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
