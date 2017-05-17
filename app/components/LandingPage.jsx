import React from 'react'
import {connect} from 'react-redux'

class LandingPage extends React.Component{
  constructor(props){
    super();
  }

  render() {
    return (
      <div id="LP-container">
      TEST LANDING PAGE
      </div>
    )
  }
}

const LandingPageContainer = connect(null, null)(LandingPage)

export default LandingPageContainer
