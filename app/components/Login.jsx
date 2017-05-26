import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export class Login extends React.Component{
  constructor(props) {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(evt) {
    evt.preventDefault()
    this.props.login(evt.target.username.value, evt.target.password.value)
  }

  render(){
    return (
      <form onSubmit={this.onLogin} >
        <input name="username" />
        <input name="password" type="password" />
        <input type="submit" value="Login" />
      </form>
    )
  }
}

export default connect(
  state => ({}),
  {login},
)(Login)
