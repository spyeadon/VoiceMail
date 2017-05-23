import React from 'react'
import {Redirect, browserHistory} from 'react-router'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export class Login extends React.Component{
  constructor(props) {
    super();
    // this.state = {mailboxRedirect: false}
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(evt) {
    evt.preventDefault()
    this.props.login(evt.target.username.value, evt.target.password.value)
    // browserHistory.push('/mailbox')
    // this.setState({mailboxRedirect: true})
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
