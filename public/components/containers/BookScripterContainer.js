// BookScripterContainer
import React, { PropTypes } from 'react'
import BookScripterPres from '../presentation/BookScripterPres'
import Loading from '../Loading'
import LogOnRender from '../hoc/LogOnRender'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'

class BookScripterContainer extends React.Component {
  componentDidMount () {
    this.props.getBookInfo(this.props.params.bookName)
  }

  render() {
    if (this.props.bookName === undefined) {
      return <Loading text="Retrieving book details" />
    }

    return (
      <BookScripterPres />
    )
  }
}

BookScripterContainer.propTypes = {}
const mapStateToProps = (store) => ({
  bookName: store.book.currentBook.bookName
})
const mapDispatchToProps = {
  getBookInfo: actions.getBookInfo
}
BookScripterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOnRender(BookScripterContainer)))
export default BookScripterContainer