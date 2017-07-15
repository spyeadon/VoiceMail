import {connect} from 'react-redux'
import React from 'react';
import {Link} from 'react-router'

import WhoAmI from './WhoAmI'
import FilterContainer from './MessageFilter.jsx'

const Navbar = connect(
  ({auth}) => ({user: auth})
)(
  ({user}) =>
    <nav className="navbar">
        <div id="navbar-left" >
          <img src="mail-icon.ico" id="logo" />
          {user ? <WhoAmI /> : null}
          {user ? <FilterContainer /> : null}
        </div>
        <div id="navbar-right">
          {user ?
              <Link to="/mailbox">
                <button
                  className="btn btn-default btn-lg"
                  id="mailbox-btn">
                  Inbox
                </button>
              </Link>:
            null}
          {user ?
            <Link to="/account">
              <button
                className="btn btn-default btn-lg"
                id="account-settings-btn">
                Account Settings
              </button>
            </Link>:
          null}
          {user ? <img src={user.img_url} id="profile-photo" /> : null}
        </div>
      </nav>
)

export default Navbar;
