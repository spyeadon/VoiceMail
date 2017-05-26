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

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

const UserProfileContainer = connect(mapStateToProps, null)(UserProfile)

export default UserProfileContainer
