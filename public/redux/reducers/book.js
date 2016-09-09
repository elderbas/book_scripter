import { combineReducers } from 'redux'

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

// const bookInQuestion = (state = {}, action) => {

// }


const book = combineReducers({
  isBeingFetched: requestSuccessFailure('FETCH_BOOK'),
  isBeingUploaded: requestSuccessFailure('UPLOAD_BOOK'),
  // bookInQuestion,
})

export default book

