import React from 'react'
import {connect} from 'react-redux'
import filterByFolder from '../utils.jsx'

const Mail = props => {

  const messages = filterByFolder(props.messages, props.currentFolder, props.auth)

  return (
    <div id="mail-container">
      Test Mail Inbox, Drafts etc...
      {
        messages.map(message =>
          <div key={message.id}>
          <span>{message.subject}</span>
          <span>{message.body}</span>
          </div>
          /*<input
            type="button"
            key={message.id}
            className="message-list"
          ><div>
              <span>{message.subject}</span>
              <span>{message.body}</span>
            </div>
        </input>*/
        )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    currentFolder: state.messages.currentFolder,
    auth: state.auth,
    userList: state.users.userList
  }
}

const MailContainer = connect(mapStateToProps, null)(Mail)

export default MailContainer
