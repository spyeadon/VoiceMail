import React from 'react'
import {connect} from 'react-redux'

class UserProfile extends React.Component{
  constructor(props){
    super();
  }

  render() {
    return (
      <div id="userProfile-container">
      TEST USER PROFILE PAGE
      </div>
    )
  }
}

const UserProfileContainer = connect(null, null)(UserProfile)

export default UserProfileContainer
