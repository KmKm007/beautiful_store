import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'

const AppRouter = () => (
  <Router>
    <Route render={({location}) => (
      <ReactCSSTransitionGroup
        transitionName="transitionWrapper"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        <Route exact path="/" component={HomePage} location={location} key={location}/>
      </ReactCSSTransitionGroup>
    )}/>
  </Router>
)

export default AppRouter
