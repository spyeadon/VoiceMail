import {connect} from 'react-redux'
import React from 'react';

import Login from './components/Login'
import WhoAmI from './components/WhoAmI'

const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <nav>
        {user ? <WhoAmI /> : <Login />}
      </nav>
      {children}
    </div>
)

export default App;
