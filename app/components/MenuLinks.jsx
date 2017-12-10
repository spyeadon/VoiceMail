import React from 'react'
import {Link} from 'react-router'

const MenuLinks = props =>
  <ul className="nav-left-1">
    <li><img src="img/mail-icon.ico" id="logo" /></li>
    <li><Link to="/mailbox">
      <button className="menu-buttons">Mailbox</button>
    </Link></li>
    <li><Link to="/account">
      <button className="menu-buttons">Account Settings</button>
    </Link></li>
  </ul>

export default MenuLinks
