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

import {getLabels, getThreads} from './action-creators/gmail.jsx'

function onEnterMailbox(nextState, replace) {
  if (store.getState().auth) {
    if (!store.getState().gmail.labels.length) store.dispatch(getLabels())
    store.dispatch(getThreads({labelIds: 'Inbox', maxResults: store.getState().gmail.threadsPerPage}))
  }
  else {replace({pathname: '/login'})}
}

function onEnterAccountPage(nextState, replace) {
  if (!store.getState().auth) replace({pathname: '/login'})
}

function onEnterLogin(nextState, replace) {
  if (store.getState().auth || nextState.auth) replace({pathname: '/mailbox'})
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/login" component={LandingPageContainer} onEnter={onEnterLogin} />
        <Route path="/mailbox" component={Mailbox} onEnter={onEnterMailbox} />
        <Route path ="/account" component={UserProfileContainer} onEnter={onEnterAccountPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
