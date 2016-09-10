import * as api from '../api'
import findIndex from 'lodash/findIndex'

export const fetchBooks = () => (dispatch) => {
  dispatch({type: 'FETCH_BOOKS_REQUEST'})
  api.fetchBooks()
  .then(
    (response) => {
      dispatch({type: 'FETCH_BOOKS_SUCCESS', response})
    },
    (err) => {
      dispatch({type: 'FETCH_BOOKS_FAILURE', message: err.message || 'Error with fetching books'})
    }
  )
}

export const uploadBook = (fileToUpload) => (dispatch) => {
  dispatch({type: 'UPLOAD_BOOK_REQUEST'})
  api.uploadBook(fileToUpload)
  .then(
    (response) => {
      dispatch({type: 'UPLOAD_BOOK_SUCCESS', response})
    },
    (err) => {
      dispatch({type: 'UPLOAD_BOOK_FAILURE', message: err.message || 'Error with uploading book'})
    }
  )
}

export const getNameSuggestion = ({ bookName, blockId, speechPreSnippetIdSelected }) => (dispatch) => {
  dispatch({type: 'FETCH_NAME_SUGGESTION_REQUEST'})
  api.getNameSuggestion({ bookName, blockId, speechPreSnippetIdSelected })
  .then(
    (response) => {
      dispatch({type: 'FETCH_NAME_SUGGESTION_SUCCESS', speechPreSnippetIdSelected, response })
    },
    (err) => {
      dispatch({type: 'FETCH_NAME_SUGGESTION_FAILURE', message: err.message || 'Error with fetching name suggestion'})
      console.log('ERR', err);
    }
  )
}
export const getBookInfo = (bookName) => (dispatch) => {
  dispatch({type: 'FETCH_BOOK_REQUEST'})
  api.getBookInfo(bookName)
  .then(
    (response) => {
      dispatch({type: 'FETCH_BOOK_SUCCESS', response})
      let { bookName, lastBlockIndexWorkedOn } = response.body
      let preSnips = response.body.currentBlockWorkingOn.preSnippets
      let speechPreSnippetIdSelected = findIndex(preSnips, ps => ps.type === 'speech')
      getNameSuggestion({bookName, blockId:lastBlockIndexWorkedOn, speechPreSnippetIdSelected})(dispatch)
    },
    (err) => {
      dispatch({type: 'FETCH_BOOK_FAILURE', message: err.message || 'Error with fetching book selected data'})
      console.log('ERR', err);
    }
  )
}

export const handleConfirmedNameOnPreSnippet = ({bookName, blockId, preSnippetId, displayName}) => (dispatch) => {
  // make request to backend to confirm the character for the given index
  console.log('IN HERE');
  api.confirmNameOnPreSnippet({bookName, blockId, preSnippetId, displayName})
  .then((response) => { // should just be the snippets on response.body
    // add new Snippet to snippets list
    dispatch({type: 'ADD_SNIPPET', snippet: response[response.length-1] })
    // remove the presnippet from preSnippets
  })
  .catch((err) => {
    console.error('ERROR in handleConfirmedNameOnPreSnippet', err);
  })



}











