import * as api from '../api'

export const fetchBooks = () => (dispatch) => {
  dispatch({type: 'FETCH_BOOKS_REQUEST'})
  api.fetchBooks()
  .then(
    (response) => dispatch({type: 'FETCH_BOOKS_SUCCESS', response}),
    (err) => dispatch({type: 'FETCH_BOOKS_FAILURE', message: err.message || 'Error with fetching books'})
  )
}

export const uploadBook = (fileToUpload) => (dispatch) => {
  dispatch({type: 'UPLOAD_BOOK_REQUEST'})
  api.uploadBook(fileToUpload)
  .then(
    (response) => dispatch({type: 'UPLOAD_BOOK_SUCCESS', response}),
    (err) => dispatch({type: 'UPLOAD_BOOK_FAILURE', message: err.message || 'Error with uploading book'})
  )
}

export const getBookInfo = (bookName) => (dispatch) => {
  dispatch({type: 'FETCH_BOOK_REQUEST'})
  api.getBookInfo(bookName)
  .then(
    (response) => dispatch({type: 'FETCH_BOOK_SUCCESS', response}),
    (err) => dispatch({type: 'FETCH_BOOK_FAILURE', message: err.message || 'Error with fetching book selected data'})
  )
}

export const handleConfirmedNameOnPreSnippet = ({bookName, blockId, preSnippetId, displayName, snippetType, preSnippetText}) => (dispatch) => {
  api.confirmNameOnPreSnippet({bookName, blockId, preSnippetId, displayName, snippetType})
  .then((response) => {
    let newSnippet = response.body[response.body.length - 1]
    newSnippet.text = preSnippetText
    dispatch({type: 'RESET_PREDICTED_NAME'})
    dispatch({type: 'ADD_SNIPPET', snippet: newSnippet })
  })
  .catch((err) => console.error('ERROR in handleConfirmedNameOnPreSnippet', err))
}

export const addCharacterProfile = (displayName, aliases, bookName) => (dispatch) => {
  api.addCharacterProfile(displayName, aliases, bookName)
  .then((response) => {
    dispatch({type: 'ADD_CHARACTER_PROFILE', characterProfile: {displayName, aliases}})
  })
  .catch((err) => console.error('ERROR in actions.addCharacterProfile', err))
}


export const handleToggledConfig = (baseName) => (dispatch) => {
  dispatch({type: 'TOGGLE_AUTO_' + baseName})
}

export const markCurrentBlockCompletedAndGetNext = (blockId, bookName) => (dispatch) => {
  api.markCurrentBlockCompletedAndGetNext(blockId, bookName)
  .then((response) => {
    dispatch({type: 'UPDATE_CURRENT_BLOCK', response})
    },
    (err) => console.error('ERROR in actions.markCurrentBlockCompletedAndGetNext', err))
}

export const modifyCharacterProfileAliases = (bookName, newCharProfile) => (dispatch) => {
  api.modifyCharacterProfileAliases(bookName, newCharProfile)
  .then((response) => {
    if (response.body.updateWorked) {
      dispatch({type: 'UPDATE_CHARACTER_PROFILE_ALIASES', newCharProfile})
    }
  })
  .catch((err) => {
    console.log('ERR in modifyCharacterProfileAliases', err);
  })
}






