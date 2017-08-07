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
      <li>
        <form onSubmit={this.searchSubmission} id="search-form">
          <div className="form-group">
            <input
              name="search"
              type="search"
              id="search-input"
            />
          </div>
          <button
            type="submit"
            className="menu-buttons">
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </form>
      </li>
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
