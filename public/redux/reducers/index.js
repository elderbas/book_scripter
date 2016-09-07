// index.js
import { combineReducers } from 'redux'
import books from './books'
import book from './book'


const rootReducer = combineReducers({
  book,
  books
})
export default rootReducer