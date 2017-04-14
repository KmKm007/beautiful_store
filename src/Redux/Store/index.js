import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware, createStore } from 'redux'
import reducers from '../reducers'

const middleWare = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleWare.push(createLogger())
}

const store = createStore(reducers, applyMiddleware(...middleWare))

export default store
