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

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/login" />
        <Route path="/login" component={LandingPageContainer} />
        <Route path="/mailbox" component={Mailbox} />
        <Route path ="/account" component={UserProfileContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
