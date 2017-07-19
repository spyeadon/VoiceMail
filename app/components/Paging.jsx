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
    <div id="thread-group-toggle" >
      <div id="paging-labels">
        <div className="current-label-page">{props.currentLabel}</div>
        <div className="current-label-page">
          <span>Page </span>
          <span>{labelThreads.threadGroup}</span>
        </div>
      </div>
      <div>
        <button
          className="paging-buttons"
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
          Previous
        </button>
        <button
          className="paging-buttons"
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
          Next
        </button>
      </div>
    </div>
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
