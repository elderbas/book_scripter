import { combineReducers } from 'redux'

const responseToCurrentBook = response => response.body.bookName

const requestSuccessFailure = (mainName) => ((state = false, action) => {
  switch (action.type) {
    case `${mainName}_REQUEST`:
      return true
    case `${mainName}_SUCCESS`:
    case `${mainName}_FAILURE`:
      return false
    default:
      return state
  }
})

const currentBook = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_BOOK_SUCCESS':
      return responseToCurrentBook(action.response)
    default:
      return state
  }
}


const book = combineReducers({
  isBeingFetched: requestSuccessFailure('FETCH_BOOK'),
  isBeingUploaded: requestSuccessFailure('UPLOAD_BOOK'),
  currentBook,
})

export default book

