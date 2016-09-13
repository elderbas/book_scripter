// CharacterListPres
import React, {PropTypes} from 'react'
import trim from 'lodash/trim'

const CharacterListPres = ({ onAddCharacterProfile, currentHighlightedPreSnippet,
characterProfiles, currentHighlightPredictedName, onCharacterSelected }) => {

    if (currentHighlightedPreSnippet === undefined) {
      return (
        <div>
          No pre snippets left to select characters for
        </div>
      )
    }
    if (currentHighlightPredictedName !== 'none' && currentHighlightPredictedName !== null) {
    return (
      <div className="predictedName" style={{width: '50px'}}>
        <button onClick={() => onCharacterSelected(currentHighlightPredictedName)}>
          {currentHighlightPredictedName}
        </button>
      </div>
    )
  }


  let characterItems, charProfilesToDisplay;
  charProfilesToDisplay = (currentHighlightedPreSnippet.type === 'narration')
    ? [{displayName: 'Narration', aliases: []}]
    : characterProfiles

  characterItems = charProfilesToDisplay.map(({displayName, aliases}) => {
    return (
      <li key={displayName} onClick={() => onCharacterSelected(displayName)}>
        <span className="displayName">{displayName}</span>
      </li>
    )
  })

  let _csvAliasesTxtBxRef, _charToAddNameTxtBxRef;
  return (
    <div className="CharacterSelectionList-component">
      <form action="#" onSubmit={(e) => {
        e.preventDefault();
        const aliases = !!_csvAliasesTxtBxRef.value ? _csvAliasesTxtBxRef.value.split(',').map(trim) : []
        const charDisplayName = _charToAddNameTxtBxRef.value
        _charToAddNameTxtBxRef.value = _csvAliasesTxtBxRef.value = '';
        onAddCharacterProfile(charDisplayName, aliases)
      }}>
        <input type="text" ref={(c) => _csvAliasesTxtBxRef = c } placeholder="New primary display name"/>
        <input type="text" ref={(c) => _charToAddNameTxtBxRef = c } placeholder="comma separated list of aliases"/>
        <button type="submit" className="button-success pure-button">Add new character name</button>
      </form>
      <div className="charListWrapper">
        <ul>
          {characterItems}
        </ul>
      </div>
    </div>
  )
}


CharacterListPres.propTypes = {}
export default CharacterListPres