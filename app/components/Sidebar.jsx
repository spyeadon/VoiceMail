import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getThreads, changeThreadGroup} from '../action-creators/gmail.jsx'
import AudioContainer from './AudioContainer.jsx'

const SidebarComponent = props =>
  (
    <div id="sidebar-container">
      <ul id="sidebar-list" >
        {
          props.labels.map(label =>
            <li key={label} className="label-LI">
              <button
                key={label}
                className="label-btn"
                onClick={() => {
                  if (props.threads[label].maxThreadGroup > 1) {
                    props.getLabelThreads({
                      labelIds: `${label}`,
                      maxResults: props.numThreads
                    }, false)
                  }
                  else {
                    props.getLabelThreads({
                      labelIds: `${label}`,
                      maxResults: props.numThreads
                    })
                  }
                  props.setThreadGroup('firstPage', label)
                }}
              >{label}</button>
            </li>
          )
        }
        <AudioContainer />
      </ul>
    </div>
  )

function mapStateToProps(state) {
  return {
    labels: state.gmail.labels,
    numThreads: state.gmail.threadsPerPage,
    threads: state.gmail.threads,
    mailLoading: state.gmail.mailLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLabelThreads(options, token) {
      dispatch(getThreads(options, token))
    },
    setThreadGroup(pageDelta, labelId) {
      dispatch(changeThreadGroup(pageDelta, labelId))
    }
  }
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)

export default Sidebar
