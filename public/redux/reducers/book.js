import { combineReducers } from 'redux'

const responseToFetchBook = response => response.body
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

const MAX_CP_TO_DISPLAY_RECENT_USED_LIST = 5;

const determineRecentCPList = (state, displayName) => {
  if (displayName === 'Narration') { // dont adjust the most frequently used list for Narration
    return state.mostRecentCharacterProfilesUsed
  }
  // if the mostRecentCharacterProfilesUsed already has a CP by display name, then do nothing
  let cpToMaybeAddToRecentList = state.mostRecentCharacterProfilesUsed.find(cp => cp.displayName === displayName)
  if (!cpToMaybeAddToRecentList) {
    // if it doesnt and we already have the max number of recent CP to display, then shift oldest one, and push it on
    if (state.mostRecentCharacterProfilesUsed.length >= MAX_CP_TO_DISPLAY_RECENT_USED_LIST) {
      // we don't have it on the recent list already, so lets grab it from the cplist and add it
      return state.mostRecentCharacterProfilesUsed.slice(1).concat([state.characterProfiles.find(cp => cp.displayName === displayName)])
    }
    return state.mostRecentCharacterProfilesUsed.concat([state.characterProfiles.find(cp => cp.displayName === displayName)])
  }
  // no change necessary
  return state.mostRecentCharacterProfilesUsed
}

const currentBook = (state = {}, action) => {
  console.log('action.snippet', action.snippet);
  switch (action.type) {
    case 'ADD_SNIPPET':
      let newState =  {
        ...state,
        idOfPreviousPreSnippetHighlighted: action.snippet.matchingPreSnippetId,
        currentBlockWorkingOn: {
          ...state.currentBlockWorkingOn,
          snippets: [ ...state.currentBlockWorkingOn.snippets, action.snippet ]
        },
        mostRecentCharacterProfilesUsed: determineRecentCPList(state, action.snippet.characterDisplayName)
      }
      console.log('newState', newState);
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
      // no reason to have this in the front end at the moment, so just removing to not clog up stuff
      delete fetchedBook.lastBlockIndexWorkedOn
      fetchedBook.currentBlockWorkingOn.snippets = newSnippets
      console.log('fetchedBook.characterProfiles', fetchedBook.characterProfiles);
      return {
        ...fetchedBook,
        idOfPreviousPreSnippetHighlighted,
        mostRecentCharacterProfilesUsed: []
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

const book = combineReducers({
  isBeingFetched: requestSuccessFailure('FETCH_BOOK'),
  isBeingUploaded: requestSuccessFailure('UPLOAD_BOOK'),
  currentBook
})

export default book

