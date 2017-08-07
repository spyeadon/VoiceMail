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
    <nav id="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <img src="img/mail-icon.ico" id="logo" />
        </div>
        {user ?
          <ul className="nav-content">
            <li><Link to="/mailbox">
              <button className="menu-buttons">Mailbox</button>
            </Link></li>
            <li><Link to="/account">
              <button className="menu-buttons">Account Settings</button>
            </Link></li>
            <Paging />
            <FilterContainer />
            <WhoAmI />
            <li><img src={user.img_url} id="profile-photo" /></li>
          </ul> :
        null}
      </div>
    </nav>
  )

export default Navbar;
