import React from 'react'
import {connect} from 'react-redux'
import {setPageThreadCount, changeMaxThreadGroups} from '../action-creators/gmail.jsx'

class UserProfile extends React.Component{
  constructor(props){
    super();
    this.state = {
      threadCount: props.numThreads
    }
    this.threadCountChange = this.threadCountChange.bind(this)
    this.threadCountSubmission = this.threadCountSubmission.bind(this)
  }

  threadCountChange(evt) {
    evt.preventDefault()
    this.setState({threadCount: evt.target.value})
  }

  threadCountSubmission(evt) {
    evt.preventDefault()
    this.props.updateMaxThreadGroups(this.state.threadCount)
    this.props.setThreadCount(this.state.threadCount)
  }

  render() {
    return (
      <div id="userProfile-container">
        <p>Number of threads per page: </p>
        <form
          id="thread-count-form"
          onSubmit={this.threadCountSubmission}
        >
          <input
            placeholder="threads per page"
            value={this.state.threadCount}
            onChange={this.threadCountChange}
            className="form-control input-lg"
          />
          <button
            type="submit"
            className="btn btn-default btn-lg"
          >
          Change
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    numThreads: state.gmail.threadsPerPage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setThreadCount(count) {
      dispatch(setPageThreadCount(count))
    },
    updateMaxThreadGroups(count) {
      dispatch(changeMaxThreadGroups(count))
    }
  }
}

const UserProfileContainer = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default UserProfileContainer
