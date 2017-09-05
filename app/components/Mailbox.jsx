import React from 'react'
import Sidebar from './Sidebar.jsx'
import MailContainer from './Mail.jsx'
import TableMailContaier from './Table-Mail.jsx'

const Mailbox = props => {
  return (
    <div id="mailbox-container" >
      <Sidebar />
      <TableMailContaier />
    </div>
  )
}

export default Mailbox;
