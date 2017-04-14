import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Router from './router'
import store from './Redux/Store'
import './styles/App.scss'
import './styles/width320.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('app'))
