import { combineReducers } from 'redux'

const responseToList = response => response.data.bookNames


const areBeingFetched = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
      return true
    case 'FETCH_BOOKS_SUCCESS':
    case 'FETCH_BOOKS_FAILURE':
      return false
    default:
      return state
  }
}

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST':
    case 'FETCH_BOOKS_SUCCESS':
      return null
    case 'FETCH_BOOKS_FAILURE':
      return action.message
    default:
      return state
  }
}

const list = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return responseToList(action.response)
    default:
      return state
  }
}


const books = combineReducers({
  list,
  areBeingFetched,
  errorMessage
})

export default books



