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
      <div id="login-container">
        <span id="new-user">New User?</span>
        <br />
        <a
          id="login-link"
          target="_self"
          href="/api/auth/login/google"
        >
          <span>Sign up with your Google account</span>
        </a>
        <hr />
        <span id="returning-user">Otherwise login below!</span>
        <form
          id="local-login-form"
          onSubmit={this.onLocalLogin} >
          <input name="username" />
          <input name="password" type="password" />
          <input type="submit" value="Login" disabled={true} />
        </form>
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
