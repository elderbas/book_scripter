// ExtractionZone
import React, {PropTypes} from 'react'
import CharacterSelectionList from '../CharacterSelectionList'



const ExtractionZone = ({ preSnippets, firstNonWhitespaceIndex, characterProfiles, currentHighlightPredictedName }) => {
  let preSnipTags = preSnippets.map(({text, id}, index) => {
    let style = (id < firstNonWhitespaceIndex) ? {display: 'none'}: {}
    return (firstNonWhitespaceIndex === index)
      ? <span className="highlightedPreSnippet" key={id}>{text}</span>
      : <span style={style} key={id}>{text}</span>
  })

  return (
    <div className="ExtractionZone-component">
      <h2>Extraction Zone</h2>
      <br /><br />
      {(currentHighlightPredictedName === 'none' || currentHighlightPredictedName === null)
        ? <div className="characterList">
            (No prediction found) Pick people from here
            <CharacterSelectionList
              characterProfiles={characterProfiles}
              firstNonWhitespacePreSnippetId={firstNonWhitespaceIndex}
            />
          </div>
        : '(no characterList)' }

      {currentHighlightPredictedName !== 'none' && currentHighlightPredictedName !== null
        ? <div className="suggestionBox">{currentHighlightPredictedName}</div>
        : '' }
      {preSnipTags}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone