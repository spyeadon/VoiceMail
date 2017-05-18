import React from 'react'
import {connect} from 'react-redux'

const Mail = props => {
  return (
    <div id="mail-container">
    Test Mail Inbox, Drafts etc...
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
