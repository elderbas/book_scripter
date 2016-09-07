// index.js
import { combineReducers } from 'redux'


const bookSelected = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_BOOK_SELECTED':
        return action.name
    default:
      return state;
  }
  return state
}


const rootReducer = combineReducers({
  bookSelected
})
export default rootReducer