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

function onEnterMessages() {
  console.log("on enter is occurring")
  console.log("auth in onEnter is: ", store.getState().auth)
  setTimeout(function() {
    if (store.getState().auth) {
      console.log("right before dispatch request")
      store.dispatch(retrieveUserMessages(store.getState().auth.id))
    }
  }, 1000)
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LandingPageContainer} />
        <Route path="/mailbox" component={Mailbox} onEnter={onEnterMessages} />
        <Route path ="/account" component={UserProfileContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
