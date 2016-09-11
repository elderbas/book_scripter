// ExtractionZone
import React, {PropTypes} from 'react'
import CharacterSelectionList from '../CharacterSelectionList'
import isUndefined from 'lodash/isUndefined'
import isNull from 'lodash/isNull'

const ExtractionZone = (
  { preSnippets, characterProfiles, currentHighlightPredictedName, onPredictClick }) => {

  let firstNonWhitespacePreSnippet = preSnippets.find(ps => ps.type !== 'whitespace')
  if (isUndefined(firstNonWhitespacePreSnippet)) {
    return (
      <div className="ExtractionZone-component">
        <div className="no-more-blocks">This block is all done!</div>
      </div>
    )
  }


  let preSnipTags = preSnippets.map(({text, id}) => {
    return (id === firstNonWhitespacePreSnippet.id)
      ? <span className="highlightedPreSnippet" key={id}>{text}</span>
      : <span key={id}>{text}</span>
  })

  return (
    <div className="ExtractionZone-component">
      <h2>Extraction Zone</h2>
      <br /><br />
      {
        (firstNonWhitespacePreSnippet.type === 'speech')
          ? <button onClick={() => onPredictClick(firstNonWhitespacePreSnippet.id)}>Predict</button>
          : ''
      }
      <div className="characterList">
        (No prediction found) Pick people from here
        <CharacterSelectionList
          characterProfiles={characterProfiles}
          firstNonWhitespacePreSnippetId={firstNonWhitespacePreSnippet.id}
        />
      </div>


      {currentHighlightPredictedName !== 'none' && isNull(currentHighlightPredictedName)
        ? <div className="suggestionBox">{currentHighlightPredictedName}</div>
        : '' }
      {preSnipTags}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone