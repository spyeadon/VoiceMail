import React from 'react'
import Sidebar from './Sidebar.jsx'
import MailContainer from './Mail.jsx'

const Mailbox = props => {
  return (
    <div id="mailbox-container" >
    <Sidebar />
    <MailContainer />
    </div>
  )
}

export default Mailbox;
