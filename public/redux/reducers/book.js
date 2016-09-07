import { combineReducers } from 'redux'

const isBeingFetched = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_BOOK_REQUEST':
      return true
    case 'FETCH_BOOK_SUCCESS':
    case 'FETCH_BOOK_FAILURE':
      return false
    default:
      return state
  }
}














const book = combineReducers({
  isBeingFetched
})

export default book// book.js

