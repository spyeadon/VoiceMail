import React from 'react'
import {connect} from 'react-redux'
import {getSearchResults} from '../action-creators/gmail.jsx'

class MessageFilter extends React.Component {
  constructor(props){
    super()
    this.searchSubmission = this.searchSubmission.bind(this)
  }

  searchSubmission(evt) {
    evt.preventDefault()
    this.props.initiateSearch({
      q: evt.target.search.value,
      maxResults: 50
    })
  }

  render() {
    return (
      <form onSubmit={this.searchSubmission} id="search-form">
        <input
          name="search"
          className="form-control input-lg"
          id="search-input"
        />
        <button
          id="search-btn"
          type="submit"
          className="btn btn-default btn-lg">
          <i className="fa fa-search" aria-hidden="true" />
        </button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initiateSearch(options){
      dispatch(getSearchResults(options))
    }
  }
}

const FilterContainer = connect(null, mapDispatchToProps)(MessageFilter)

export default FilterContainer;
