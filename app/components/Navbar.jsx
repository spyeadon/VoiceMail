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
    <nav id="navbar" role="navigation">
      <div className="container-fluid">
        <ul className="navbar-left">
          <li><img src="img/mail-icon.ico" id="logo" /></li>
        </ul>
        {user ?
          <ul className="nav-content">
            <li className="collapse-sm"><Link to="/mailbox">
              <button className="menu-buttons">Mailbox</button>
            </Link></li>
            <li className="collapse-sm"><Link to="/account">
              <button className="menu-buttons">Account Settings</button>
            </Link></li>
            <Paging />
          </ul> :
        null}
        {user ?
          <ul className="navbar-right">
            <FilterContainer />
            <WhoAmI />
            <li className="collapse-sm">
              <img src={user.img_url} id="profile-photo" />
            </li>
          </ul> :
        null}
      </div>
    </nav>
  )

export default Navbar;
