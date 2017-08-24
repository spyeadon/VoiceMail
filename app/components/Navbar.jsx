import {connect} from 'react-redux'
import React from 'react';
import {Link} from 'react-router'

import WhoAmI from './WhoAmI'
import FilterContainer from './MessageFilter.jsx'
import Paging from '../components/Paging.jsx'
import MenuLinks from './MenuLinks.jsx'

const Navbar = connect(
  ({auth}) => ({user: auth})
)(
  ({user}) =>
    <nav id="navbar" role="navigation">
      <div className="container-fluid">
        {user ?
          <div className="nav-left-container">
            <MenuLinks />
            <Paging />
          </div> :
        null}
        {user ?
          <div className="nav-right-container">
            <FilterContainer />
            <WhoAmI />
          </div> :
        null}
      </div>
    </nav>
  )

export default Navbar;
