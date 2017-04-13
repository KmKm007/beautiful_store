import 'core-js/fn/object/assign'
import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { Provider } from 'react-redux'
import reducers from './reducers'
import Router from './router'
import './styles/App.scss'
// import 'vconsole'

const middleWare = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger())
}

const store = createStore(reducers, applyMiddleware(...middleWare))

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>, document.getElementById('app'))
