import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getThreads} from '../action-creators/gmail.jsx'
import AudioContainer from './AudioContainer.jsx'

const SidebarComponent = props =>
  (
    <div id="sidebar-container" >
      {
        props.labels.map(label =>
          <button
            key={label}
            className="label-LI"
            onClick={() => props.getLabelThreads({ labelIds: `${label}`, maxResults: props.numThreads})}
          >{label}</button>
        )
      }
      <AudioContainer />
    </div>
  )

function mapStateToProps(state) {
  return {
    labels: state.gmail.labels,
    numThreads: state.gmail.threadsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLabelThreads(options) {
      dispatch(getThreads(options))
    }
  }
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)

export default Sidebar
