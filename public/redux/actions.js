import * as api from '../api'


// purpose of a thunk, is to be able to perform multiple dispatches
// within a single 'dispatch invocation'
export const fetchBooks = () => (dispatch) => {
  dispatch({type: 'FETCH_BOOKS_REQUEST'})
  api.fetchBooks()
  .then(
    (response) => {
      dispatch({type: 'FETCH_BOOKS_SUCCESS', response})
    },
    (err) => {
      dispatch({type: 'FETCH_BOOKS_FAILURE', message: err.message || 'Something went wrong'})
    }
  )
}