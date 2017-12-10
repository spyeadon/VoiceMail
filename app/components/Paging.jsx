import React from 'react'
import {connect} from 'react-redux'
import {changeThreadGroup, getThreads} from '../action-creators/gmail.jsx'
import {threadsToRender} from '../utils.jsx'

const Paging = props => {

  const labelThreads = props.threads[props.currentLabel]
  const threads = threadsToRender(
    labelThreads.threads,
    props.numThreads,
    labelThreads.threadGroup
  )

  return (
      <ul className="nav-left-2">
        <li><p className="nav-labelId">{props.currentLabel}</p></li>
        <li><p className="navbar-text">Page {labelThreads.threadGroup}</p></li>
        <li><button
          className="menu-buttons right-margin"
          disabled={labelThreads.threadGroup === 1}
          onClick={() => {
            if (labelThreads.threadGroup === 2 && props.currentLabel !== 'search') {
              props.getLabelThreads({
                labelIds: props.currentLabel,
                maxResults: props.numThreads
              }, false)
            }
            props.setThreadGroup('previous', props.currentLabel)
          }}
        >
          <i className="fa fa-chevron-left" aria-hidden="true" />
        </button></li>
        <li><button
          className="menu-buttons"
          disabled={
            !threads.length || props.currentLabel === 'search' &&
            props.threads.search.threadGroup === props.threads.search.maxThreadGroup
          }
          onClick={() => {
            if (labelThreads.maxThreadGroup === labelThreads.threadGroup) {
              props.getLabelThreads({
                labelIds: props.currentLabel,
                maxResults: props.numThreads,
                pageToken: labelThreads.nextPageToken
              })
            }
            props.setThreadGroup('next', props.currentLabel)
          }}
        >
          <i className="fa fa-chevron-right" aria-hidden="true" />
        </button></li>
      </ul>
  )
}

function mapStateToProps(state) {
  return {
    threads: state.gmail.threads,
    currentLabel: state.gmail.currentLabel,
    numThreads: state.gmail.threadsPerPage
  }
}

function mapStateToDispatch(dispatch) {
  return {
    setThreadGroup(pageDelta, labelId) {
      dispatch(changeThreadGroup(pageDelta, labelId))
    },
    getLabelThreads(options, token) {
      dispatch(getThreads(options, token))
    }
  }
}

const PagingContainer = connect(mapStateToProps, mapStateToDispatch)(Paging)

export default PagingContainer
