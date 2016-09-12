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
      let { snippets, preSnippets } = state.currentBlockWorkingOn
      let nextPreSnippetIndexToStartAt = preSnippets.findIndex(ps => ps.type !== 'whitespace' && ps.id !== action.snippet.matchingPreSnippetId)
      let newState =  {
        ...state,
        currentBlockWorkingOn: {
          ...state.currentBlockWorkingOn,
          snippets: [ ...snippets, action.snippet ],
          preSnippets: (nextPreSnippetIndexToStartAt === -1) ? [] : preSnippets.slice(nextPreSnippetIndexToStartAt)
        }
      }
      return newState

    case 'FETCH_BOOK_SUCCESS':
      return responseToFetchBook(action.response)

    case 'ADD_CHARACTER_PROFILE':
      return { ...state, characterProfiles: [...state.characterProfiles, action.characterProfile] }
    default:
      return state
  }
}
const currentHighlightPredictedName = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_NAME_SUGGESTION_SUCCESS':
      let namesSuggested = responseToNameSuggestion(action.response)
      let valueToUseForName = (namesSuggested.length > 0) ? namesSuggested[0].displayName : 'none';
      return valueToUseForName

    case 'RESET_PREDICTED_NAME':
      return null
    default:
      return state
  }
}

const book = combineReducers({
  isBeingFetched: requestSuccessFailure('FETCH_BOOK'),
  isBeingUploaded: requestSuccessFailure('UPLOAD_BOOK'),
  isFetchingNameSuggestion: requestSuccessFailure('FETCH_NAME_SUGGESTION'),
  currentBook,
  currentHighlightPredictedName,
})

export default book

