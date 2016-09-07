import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import get from 'lodash/get'
const _ = { get }
import rootReducer from './reducers'


const configureStore = () => {
  const middlewares = [thunk]
  if (_.get(process, 'env.NODE_ENV') !== 'production') {
    middlewares.push(createLogger())
  }

  return createStore(
    rootReducer,
    applyMiddleware(...middlewares)
  )
}

export default configureStore