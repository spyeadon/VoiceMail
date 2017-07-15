import React from 'react'
import {connect} from 'react-redux'

import Login from './Login.jsx'

const LandingPage =  (props) =>
  <div id="LP-container">
    <h1 id="LP-header">Welcome to VoiceMail!</h1>
    <Login />
  </div>

const LandingPageContainer = connect(null, null)(LandingPage)

export default LandingPageContainer
