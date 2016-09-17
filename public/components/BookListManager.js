// BookListManager
import React, { PropTypes } from 'react'
import '../scss/index.scss'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import LogOnRender from './hoc/LogOnRender'
import BookFileUpload from './presentation/BookFileUpload'
import BooksUploadedList from './presentation/BooksUploadedList'

const style = {
  marginLeft: '70px',
  marginTop: '50px'
}
class BookListManager extends React.Component {
  componentDidMount () { this.props.fetchBooks() }
  uploadBook (files) { this.props.uploadBook(files[0]) }
  render() {
    const { areBeingFetched, bookList, isBeingUploaded } = this.props

    return (
      <div style={style}>
        <BooksUploadedList
          areBeingFetched={areBeingFetched}
          bookList={bookList}
        />
        <BookFileUpload
          onDrop={this.uploadBook.bind(this)}
          isBeingUploaded={isBeingUploaded}
        />
      </div>
    )
  }
}
BookListManager.propTypes = {}

const mapStateToProps = (state) => ({
  areBeingFetched: state.books.areBeingFetched,
  isBeingUploaded: state.book.isBeingUploaded,
  bookList: state.books.list,
})
const mapDispatchToProps = {
  fetchBooks: actions.fetchBooks,
  uploadBook: actions.uploadBook,
}

// BookListManager = connect(mapStateToProps, mapDispatchToProps)(BookListManager)
BookListManager = connect(mapStateToProps, mapDispatchToProps)(LogOnRender(BookListManager))
export default BookListManager


















