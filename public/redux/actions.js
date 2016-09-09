import * as api from '../api'

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

export const getBookInfo = (bookName) => (dispatch) => {
  dispatch({type: 'FETCH_BOOK_REQUEST'})
  api.getBookInfo(bookName)
  .then(
    (response) => {
      console.log('!!!', response.body);
      dispatch({type: 'FETCH_BOOK_SUCCESS', response})
    },
    (err) => {
      dispatch({type: 'FETCH_BOOK_FAILURE', message: err.message || 'Error with fetching book selected data'})
      console.log('ERR', err);
    }
  )
}