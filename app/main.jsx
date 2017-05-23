'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import App from './App.jsx';
import Mailbox from './components/Mailbox.jsx'
import LandingPageContainer from './components/LandingPage.jsx'
import UserProfileContainer from './components/UserProfile.jsx'

import {retrieveUserMessages} from './action-creators/messages.jsx'

function onEnterMailbox(nextState, replace) {
  if (nextState.auth || store.getState().auth) store.dispatch(retrieveUserMessages(nextState.auth.id))
  else replace({pathname: '/login'})
}

function onEnterAccountPage(nextState, replace) {
  if (!nextState.auth) replace({pathname: '/login'})
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LandingPageContainer} />
        <Route path="/mailbox" component={Mailbox} onEnter={onEnterMailbox} />
        <Route path ="/account" component={UserProfileContainer} onEnter={onEnterAccountPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
