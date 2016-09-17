// ExtractionZoneContainer
import React from 'react'
import { connect } from 'react-redux'
import ExtractionZonePres from '../presentation/ExtractionZonePres'
import LogOnRender from '../hoc/LogOnRender'

const mapStateToProps = (store) => {
  let { currentBook:{currentBlockWorkingOn:{ preSnippets }, idOfPreviousPreSnippetHighlighted } } = store.book
  let currentHighlightedPreSnippet = preSnippets.find(ps => {
    return (ps.type !== 'whitespace') && ps.id > idOfPreviousPreSnippetHighlighted
  })
  return { preSnippets, currentHighlightedPreSnippet, idOfPreviousPreSnippetHighlighted }
}
const ExtractionZoneContainer = connect(mapStateToProps)(LogOnRender(ExtractionZonePres))
export default ExtractionZoneContainer