import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import {getThreads} from '../action-creators/gmail.jsx'

const SidebarComponent = props => {
  return (
    <div id="sidebar-container" >
    {
      props.labels.map(label =>
        <button
          key={label}
          className="label-LI"
          onClick={() => props.getLabelThreads({ labelIds: `${label}`})}
        >{label}</button>
      )
    }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    labels: state.gmail.labels
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLabelThreads(labelIds, label) {
      dispatch(getThreads(labelIds, label))
    }
  }
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);

export default Sidebar
