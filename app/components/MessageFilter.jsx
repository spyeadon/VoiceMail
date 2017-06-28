import React from 'react'
import {connect} from 'react-redux'

const MessageFilter = props => {
  return (
    <form id="search-form">
      <input className="form-control input-lg" id="search-input" />
      <button
        id="search-btn"
        type="submit"
        className="btn btn-default btn-lg">
        <i className="fa fa-search" aria-hidden="true" />
      </button>
    </form>
  )
}

const FilterContainer = connect(null, null)(MessageFilter)

export default FilterContainer;
