// index.js
import { combineReducers } from 'redux'
import books from './books'
import book from './book'
import config from './config'


const rootReducer = combineReducers({
  book,
  books,
  config,
})
export default rootReducer