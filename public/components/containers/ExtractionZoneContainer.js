// ExtractionZoneContainer
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import ExtractionZonePres from '../presentation/ExtractionZonePres'


const mapStateToProps = (store) => {
  let { preSnippets } = store.book.currentBook.currentBlockWorkingOn
  let currentHighlightedPreSnippet = preSnippets.find(ps => ps.type !== 'whitespace')
  // debugger;
  return {
    preSnippets,
    currentHighlightedPreSnippet
  }
}
const ExtractionZoneContainer = connect(mapStateToProps)(ExtractionZonePres)
export default ExtractionZoneContainer