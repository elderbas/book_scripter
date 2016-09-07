import * as api from '../api'



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