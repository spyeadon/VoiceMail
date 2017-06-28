import React from 'react'
import {loginLocal, loginOAUTH} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export class Login extends React.Component{
  constructor(props) {
    super();
    this.onLocalLogin = this.onLocalLogin.bind(this);
  }

  onLocalLogin(evt) {
    evt.preventDefault()
    this.props.login(evt.target.username.value, evt.target.password.value)
  }

  render(){
    return (
      <div>
        <a id="login" target="_self" href="/api/auth/login/google">
          <span>Log in with Google</span>
        </a>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login(username, password) {
      dispatch(loginLocal(username, password))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
