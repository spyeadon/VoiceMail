import React from 'react'
import {connect} from 'react-redux'

const Mail = props => {

  const threads = props.threads[props.currentLabel].threads

  return (
    <div id="mail-container">
      {
        threads.map(thread =>
          <div key={thread.threadId} className="thread-LI">
          <span>{thread.messages[0].headers['From'].split('<')[0]}</span>
          <span>{thread.messages[0].headers['Subject']}</span>
          <span>{thread.snippet}</span>
          </div>
        )
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    threads: state.gmail.threads,
    currentLabel: state.gmail.currentLabel,
    auth: state.auth,
  }
}

const MailContainer = connect(mapStateToProps, null)(Mail)

export default MailContainer
