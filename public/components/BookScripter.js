// BookScripter
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../redux/actions'
import Loading from './Loading'
import Snippets from './Presentation/Snippets'
import ExtractionZone from './Presentation/ExtractionZone'

import isUndefined from 'lodash/isUndefined'
import isNull from 'lodash/isNull'
import get from 'lodash/get'


class BookScripter extends React.Component {
  getNameSuggestion (preSnippetsId) {
    const { getNameSuggestion, params, currentBook } = this.props;
    getNameSuggestion({
      bookName: params.bookName,
      blockId: currentBook.lastBlockIndexWorkedOn,
      speechPreSnippetIdSelected: preSnippetsId
    })
  }
  componentDidMount () {
    const { getBookInfo, params } = this.props;
    getBookInfo(params.bookName)
  }

  // i feel like this is way too much work to be doing this
  componentWillReceiveProps (nextProps) {
    if (get(this.props, 'currentBook.currentBlockWorkingOn')) {
      let { currentHighlightPredictedName } = nextProps
      let { currentBlockWorkingOn: {preSnippets} } = nextProps.currentBook
      let firstNonWhitespacePreSnippet = preSnippets.find(ps => ps !== 'whitespace')
      if (firstNonWhitespacePreSnippet && firstNonWhitespacePreSnippet.type === 'speech' && isNull(currentHighlightPredictedName)) {
        this.getNameSuggestion(firstNonWhitespacePreSnippet.id)
      }
    }
  }
  render() {
    if (this.props.currentBook.bookName === undefined) {
      return <Loading text="Retrieving book details" />
    }
    const {characterProfiles, bookName, currentBlockWorkingOn: {snippets, preSnippets} } = this.props.currentBook;
    let firstNonWhitespacePreSnippet = preSnippets.find(ps => ps.type !== 'whitespace')

    return (
      <div className="BookScripter-component">
        <h1>{bookName}</h1>
        <Snippets snippets={snippets} />
        { isUndefined(firstNonWhitespacePreSnippet)
          ? ( <div className="ExtractionZone-component">
                <div className="no-more-blocks">This block is all done!</div>
              </div>)
          : (<ExtractionZone
              firstNonWhitespacePreSnippet={firstNonWhitespacePreSnippet}
              preSnippets={preSnippets}
              characterProfiles={characterProfiles}
            />)
        }
      </div>
    )
  }
}


BookScripter.propTypes = {}
const mapStateToProps = (store, ownProps) => ({
  currentBook: store.book.currentBook,
  currentHighlightPredictedName: store.book.currentHighlightPredictedName,
})
BookScripter = withRouter(connect(mapStateToProps, actions)(BookScripter))
export default BookScripter












