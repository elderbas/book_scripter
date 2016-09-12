// ExtractionZone
import React, {PropTypes} from 'react'
import CharacterSelectionList from '../CharacterSelectionList'

import isNull from 'lodash/isNull'

const ExtractionZone = (
  { preSnippets, characterProfiles, currentHighlightPredictedName, firstNonWhitespacePreSnippet }) => {


  let preSnipTags = preSnippets.map(({text, id}) => {
    return (id === firstNonWhitespacePreSnippet.id)
      ? <span className="highlightedPreSnippet" key={id}>{text}</span>
      : <span key={id}>{text}</span>
  })

  return (
    <div className="ExtractionZone-component">
      <h2>Extraction Zone</h2>
      <br /><br />
      {currentHighlightPredictedName === 'none' || currentHighlightPredictedName === null
        ? <div className="characterList">
            (No prediction found) Pick people from here
            <CharacterSelectionList
              characterProfiles={characterProfiles}
              firstNonWhitespacePreSnippetId={firstNonWhitespacePreSnippet.id}
            />
          </div>
        : ''
      }

      {currentHighlightPredictedName !== 'none'
        ? <div className="suggestionBox">{currentHighlightPredictedName}</div>
        : '' }
      {preSnipTags}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone