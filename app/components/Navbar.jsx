import {connect} from 'react-redux'
import React from 'react';
import {Link} from 'react-router'

import WhoAmI from './WhoAmI'
import FilterContainer from './MessageFilter.jsx'
import Paging from '../components/Paging.jsx'

const Navbar = connect(
  ({auth}) => ({user: auth})
)(
  ({user}) =>
    <nav className="navbar">
      <div id="navbar-left" >
        <img src="mail-icon.ico" id="logo" />
        {user ?
          <div id="menu-btn-container">
            <Link to="/mailbox">
              <button className="btn btn-default btn-lg menu-buttons">
                Mailbox
              </button>
            </Link>
            <Link to="/account">
              <button className="btn btn-default btn-lg menu-buttons">
                Account Settings
              </button>
            </Link>
          </div> :
        null}
        {user ? <Paging /> : null}
      </div>
      <div id="navbar-right">
        {user ? <FilterContainer /> : null}
        {user ? <WhoAmI /> : null}
        {user ? <img src={user.img_url} id="profile-photo" /> : null}
      </div>
    </nav>
  )

export default Navbar;
