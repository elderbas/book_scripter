// BookScripter
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../redux/actions'
import Loading from './Loading'
import Snippets from './Presentation/Snippets'
import ExtractionZone from './Presentation/ExtractionZone'


class BookScripter extends React.Component {
  componentDidMount () {
    const { getBookInfo, params } = this.props;
    console.log('params', params);
    getBookInfo(params.bookName)
  }
  render() {
    if (this.props.currentBook === null) {
      return <Loading text="Retrieving book details" />
    }
    const { bookName, currentBlockWorkingOn: {snippets, preSnippets} } = this.props.currentBook;
    return (
      <div>
        <h1>{bookName}</h1>
        <Snippets snippets={snippets} />
        <ExtractionZone preSnippets={preSnippets} />
      </div>
    )
  }
}





BookScripter.propTypes = {}
const mapStateToProps = (store, ownProps) => ({
  currentBook: store.book.currentBook
})
BookScripter = withRouter(connect(mapStateToProps, actions)(BookScripter))
export default BookScripter