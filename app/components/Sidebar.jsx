import React from 'react'
import {Link} from 'react-router'
import changeFolder from '../action-creators/messages.jsx'
import {connect} from 'react-redux'

const SidebarComponent = props => {
  return (
    <div id="sidebar-container" >
      <button
        className="mailbox-list"
        onClick={() => (props.switchFolder('inbox'))}
      >Inbox</button>
      <button
        className="mailbox-list"
        onClick={() => (props.switchFolder('drafts'))}
      >Drafts</button>
      <button
        className="mailbox-list"
        onClick={() => (props.switchFolder('sentMail'))}
      >Sent Mail</button>
      <button
        className="mailbox-list"
        onClick={() => (props.switchFolder('important'))}
      >Important</button>
      <button
        className="mailbox-list"
        onClick={() => (props.switchFolder('trash'))}
      >Trash</button>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    switchFolder(folder) {
      dispatch(changeFolder(folder))
    }
  }
}

const Sidebar = connect(null, mapDispatchToProps)(SidebarComponent);

export default Sidebar
