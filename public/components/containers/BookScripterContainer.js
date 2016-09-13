// BookScripterContainer
import React, {PropTypes} from 'react'
import BookScripterPres from './BookScripterPres'
import Loading from '../Loading'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'
import isUndefined from 'lodash/isUndefined'


class BookScripterContainer extends React.Component {

  componentDidMount () {
    this.props.getBookInfo(this.props.params.bookName)
  }

  render() {
    if (isUndefined(this.props.bookName)) {
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
BookScripterContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BookScripterContainer))
export default BookScripterContainer