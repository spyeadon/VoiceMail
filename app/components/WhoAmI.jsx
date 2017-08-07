import React from 'react'

export const WhoAmI = ({ user, logout }) => (
  <li className="whoami">
    <ul className="nav-content">
      <li><p className="navbar-text">{user && user.name}</p></li>
      <li><button className="menu-buttons" onClick={logout}>Logout</button></li>
    </ul>
  </li>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
