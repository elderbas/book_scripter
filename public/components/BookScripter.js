// BookScripter
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../redux/actions'

import Snippets from './Presentation/Snippets'
import ExtractionZone from './Presentation/ExtractionZone'

const spill = j => JSON.stringify(j)

class BookScripter extends React.Component {
  componentDidMount () {
    const { getBookInfo, params } = this.props;
    getBookInfo(params.bookName)
  }
  render() {
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