import { combineReducers } from 'redux'

const responseToFetchBook = response => response.body
const responseToNameSuggestion = response => response.body.characterProfilesSuggested
const idOfPreviousPreSnippetHighlightedDefault = -1

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
      let newState =  {
        ...state,
        idOfPreviousPreSnippetHighlighted: action.snippet.matchingPreSnippetId,
        currentBlockWorkingOn: {
          ...state.currentBlockWorkingOn,
          snippets: [ ...state.currentBlockWorkingOn.snippets, action.snippet ]
        }
      }
      return newState

    case 'FETCH_BOOK_SUCCESS':
      // kinda messy but the idea is to normalize the text from the preSnippets since the snippets
      // arent storing any text on the backend. then we need to initialize
      // also initializing 'idOfPreviousPreSnippetHighlighted' since it's based on which pre snippets
      // we last
      // althought we could just just the snippets array passed down to the preSnippetsExhibit
      // and look at the last id there and use logic from that.
      let fetchedBook = responseToFetchBook(action.response)
      let { snippets, preSnippets } = fetchedBook.currentBlockWorkingOn
      // get data from pre snippets
      // kinda sloppy, but just set to last id set
      let idOfPreviousPreSnippetHighlighted = idOfPreviousPreSnippetHighlightedDefault;
      let newSnippets = snippets.map((snippet) => {
        idOfPreviousPreSnippetHighlighted = snippet.matchingPreSnippetId
        return {
          ...snippet,
          text: preSnippets[snippet.matchingPreSnippetId].text
        }
        return snippets
      })
      // no reason to have this. the
      delete fetchedBook.lastBlockIndexWorkedOn
      fetchedBook.currentBlockWorkingOn.snippets = newSnippets
      return {
        ...fetchedBook,
        idOfPreviousPreSnippetHighlighted
      }

    case 'ADD_CHARACTER_PROFILE':
      return { ...state, characterProfiles: [...state.characterProfiles, action.characterProfile] }

    case 'UPDATE_CURRENT_BLOCK':
      let nextBlock = action.response.body.nextBlock
      // need to consider when we run out of blocks
      let newStateFromNewBlock = {
        ...state,
        currentBlockWorkingOn: nextBlock,
        idOfPreviousPreSnippetHighlighted: idOfPreviousPreSnippetHighlightedDefault
      }
      return newStateFromNewBlock
    case 'UPDATE_CHARACTER_PROFILE_ALIASES': {
      return {
        ...state,
        characterProfiles: state.characterProfiles.map((cp) => {
          return (cp._id === action.newCharProfile._id)
            ? { ...cp, aliases: action.newCharProfile.aliases }
            : cp
        })
      }
    }
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

