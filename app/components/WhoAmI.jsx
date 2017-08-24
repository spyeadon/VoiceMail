import React from 'react'

export const WhoAmI = ({ user, logout }) => (
  <ul className="nav-right-2">
    <li><p className="navbar-text">{user && user.name}</p></li>
    <li><button className="menu-buttons" onClick={logout}>Logout</button></li>
    <li className="collapse-sm">
      <img src={user.img_url} id="profile-photo" />
    </li>
  </ul>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
