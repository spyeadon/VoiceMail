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
      <div className="container-fluid">
        <div className="navbar-header">
          <img src="img/mail-icon.ico" id="logo" />
        </div>
        <div id="navbar-left" >
          {user ?
            <div id="menu-btn-container">
              <Link to="/mailbox">
                <button className="menu-buttons">
                  Mailbox
                </button>
              </Link>
              <Link to="/account">
                <button className="menu-buttons">
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
      </div>
    </nav>
  )

export default Navbar;
