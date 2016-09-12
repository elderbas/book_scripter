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

class BookScripter extends React.Component {
  componentDidMount () {
    const { getBookInfo, params } = this.props;
    getBookInfo(params.bookName)
  }
  getNameSuggestion (preSnippetsId) {
    const { getNameSuggestion, params, currentBook } = this.props;
    getNameSuggestion({
      bookName: params.bookName,
      blockId: currentBook.lastBlockIndexWorkedOn,
      speechPreSnippetIdSelected: preSnippetsId
    })
  }
  componentWillMount () {
    if (this.props.currentBook.currentBlockWorkingOn !== undefined) {
      const { currentBlockWorkingOn: {preSnippets} } = this.props.currentBook;
      let firstNonWhitespacePreSnippet = preSnippets.find(ps => ps.type !== 'whitespace')
      this.getNameSuggestion(firstNonWhitespacePreSnippet.id)
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log('IN componentWillReceiveProps');
    console.log('this.props', this.props);
    console.log('this.nextProps', nextProps);
    if (this.props.currentHighlightPredictedName !== nextProps.currentHighlightPredictedName) {
      const { currentHighlightPredictedName } = nextProps
      const { currentBlockWorkingOn,  currentBlockWorkingOn: {preSnippets} } = nextProps.currentBook;

      if (currentBlockWorkingOn !== undefined) {
        console.log('YAYz');
        let firstNonWhitespacePreSnippet = preSnippets.find(ps => ps.type !== 'whitespace')
        if (firstNonWhitespacePreSnippet.type === 'speech' && isNull(currentHighlightPredictedName)) {
          console.log('GETTING SUGGESTION for----->', firstNonWhitespacePreSnippet);
          this.getNameSuggestion(firstNonWhitespacePreSnippet.id)
        }
      }
    }
  }
  render() {
    if (this.props.currentBook.bookName === undefined) {
      return <Loading text="Retrieving book details" />
    }
    const {characterProfiles, bookName, currentBlockWorkingOn: {snippets, preSnippets} } = this.props.currentBook;
    const { currentHighlightPredictedName } = this.props
    let firstNonWhitespacePreSnippet = preSnippets.find(ps => ps.type !== 'whitespace')


    if (isUndefined(firstNonWhitespacePreSnippet)) {
      return (
        <div className="ExtractionZone-component">
          <div className="no-more-blocks">This block is all done!</div>
        </div>
      )
    }
    /// do prediction on it
    console.log('!@!#!#currentHighlightPredictedName', currentHighlightPredictedName);



    return (
      <div className="BookScripter-component">
        <h1>{bookName}</h1>
        <Snippets snippets={snippets} />
        <ExtractionZone
          firstNonWhitespacePreSnippet={firstNonWhitespacePreSnippet}
          preSnippets={preSnippets}
          currentHighlightPredictedName={currentHighlightPredictedName}
          characterProfiles={characterProfiles}
        />
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












