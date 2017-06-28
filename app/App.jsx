import {connect} from 'react-redux'
import React from 'react';
import Navbar from './components/Navbar.jsx'

const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <Navbar />
      <div id="content-container">
        {children}
      </div>
    </div>
)

export default App;
