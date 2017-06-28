import {connect} from 'react-redux'
import React from 'react';

import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav className="navbar">
        <img src="mail-icon.ico" id="logo" />
        {user ? <WhoAmI /> : <Login />}
      </nav>
      <div id="content-container">
        {children}
      </div>
    </div>
)

export default App;
