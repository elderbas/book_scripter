// BookListManager
import React, {PropTypes} from 'react'
import '../scss/index.scss'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'

import BookFileUpload from './Presentation/BookFileUpload'
import BooksUploadedList from './Presentation/BooksUploadedList'


class BookListManager extends React.Component {
  componentDidMount () {
    this.props.fetchBooks()
  }
  uploadBook (files) {
    this.props.uploadBook(files[0])
  }
  handleBookClicked (bookName) {
    this.props.getBookInfo(bookName)
  }
  render() {
    const { areBeingFetched, bookList, isBeingUploaded } = this.props

    return (
      <div className="BookListManager-component">
        <BooksUploadedList
          areBeingFetched={areBeingFetched}
          bookList={bookList}
          onBookClicked={this.handleBookClicked.bind(this)} />
        <BookFileUpload
          onDrop={this.uploadBook.bind(this)}
          isBeingUploaded={isBeingUploaded} />
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
BookListManager = connect(mapStateToProps, actions)(BookListManager)
export default BookListManager


















