// ExtractionZone
import React, { PropTypes } from 'react'
import CharacterSelectionList from '../CharacterSelectionList'

const ExtractionZone = ({ preSnippets, characterProfiles, firstNonWhitespacePreSnippet }) => {
  let preSnipTags = preSnippets.map(({text, id}) => {
    return (id === firstNonWhitespacePreSnippet.id)
      ? <span className="highlightedPreSnippet" key={id}>{text}</span>
      : <span key={id}>{text}</span>
  })

  return (
    <div className="ExtractionZone-component">
      <h2>Extraction Zone</h2>
      <br /><br />
      <div className="characterList">
        <CharacterSelectionList
          characterProfiles={characterProfiles}
          firstNonWhitespacePreSnippet={firstNonWhitespacePreSnippet}
        />
      </div>
      {preSnipTags}
    </div>
  )
}

ExtractionZone.propTypes = {}
export default ExtractionZone