import React from 'react'
import {Link} from 'react-router'
import {changeFolder} from '../action-creators/messages.jsx'
import {connect} from 'react-redux'

const SidebarComponent = props => {
  return (
    <div id="sidebar-container" >
    {
      props.folders.map(folder =>
        <button
          key={folder}
          className="mailbox-list"
          onClick={() => (props.switchFolder(`${folder}`))}
        >{folder}</button>
      )
    }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    folders: state.messages.folders
  }
}

function mapDispatchToProps(dispatch) {
  return {
    switchFolder(folder) {
      dispatch(changeFolder(folder))
    }
  }
}

const Sidebar = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);

export default Sidebar
