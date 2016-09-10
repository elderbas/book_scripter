import { combineReducers } from 'redux'

const responseToFetchBook = response => response.body
const responseToNameSuggestion = response => response.body.characterProfilesSuggested

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

const currentBook = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_SNIPPET':
      console.log('state', state);
      let newState =  {
        ...state,
        currentBlockWorkingOn: {
          ...state.currentBlockWorkingOn,
          snippets: [
            ...state.currentBlockWorkingOn.snippets,
            action.val
          ]
        }
      }
      console.log('new snippets state', state.currentBlockWorkingOn.snippets);
      return newState

    case 'FETCH_BOOK_SUCCESS':
      return responseToFetchBook(action.response)

    case 'FETCH_NAME_SUGGESTION_SUCCESS':
      let namesSuggested = responseToNameSuggestion(action.response)
      let valueToUseForName = (namesSuggested.length > 0) ? namesSuggested[0].displayName : 'none';
      return {
        ...state,
        currentBlockWorkingOn: {
          ...state.currentBlockWorkingOn,
          preSnippets: state.currentBlockWorkingOn.preSnippets.map(preSnip => {
            if (preSnip.id === action.speechPreSnippetIdSelected) {
              return { ...preSnip, predictedCharacterNameNormalized: valueToUseForName }
            }
            return preSnip
          })
        }
      }

    default:
      return state
  }
}

// const idLeftMostSpeech = (state = null, action) => {
//   switch (action.type) {
//     case 'REMOVE_':
//
//     default:
//       return state
//   }
// }

const book = combineReducers({
  // idLeftMostSpeech,
  isBeingFetched: requestSuccessFailure('FETCH_BOOK'),
  isBeingUploaded: requestSuccessFailure('UPLOAD_BOOK'),
  isFetchingNameSuggestion: requestSuccessFailure('FETCH_NAME_SUGGESTION'),
  currentBook,
})

export default book

