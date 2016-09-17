// CharacterListPres
import React, {PropTypes} from 'react'
import trim from 'lodash/trim'
import LogOnRender from '../hoc/LogOnRender'

const predictedNameBtnStyle = {
  padding: '5px'
}

let CharacterListPres = ({ onAddCharacterProfile, currentHighlightedPreSnippet,
  autoConfirmNarration, autoConfirmPredictedName,
characterProfiles, currentHighlightPredictedName, onCharacterSelected, onToggleConfig}) => {
    // debugger;
    if (currentHighlightedPreSnippet === undefined) {
      return (
        <div>
          No pre snippets left to select characters for
        </div>
      )
    }
    if (currentHighlightPredictedName !== 'none' && currentHighlightPredictedName !== null) {
    return (
      <div style={{width: '50px'}}>
        <button style={predictedNameBtnStyle} onClick={() => onCharacterSelected(currentHighlightPredictedName)}>
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
        <span className="displayName">{`${displayName} - ${aliases.join(',')}`}</span>
      </li>
    )
  })

  let _charToAddNameTxtBxRef, _csvAliasesTxtBxRef
  return (
    <div className="CharacterSelectionList-component">
      <input type="checkbox"
             checked={autoConfirmNarration}
             name="auto_narration"
             onChange={() => onToggleConfig('CONFIRM_NARRATION')} />
      <label htmlFor="auto_narration">Auto Confirm Narration types</label>
      <br />
      <input type="checkbox"
             checked={autoConfirmPredictedName}
             name="auto_predicted_name"
             onChange={() => onToggleConfig('CONFIRM_PREDICTED_NAME')}/>
      <label htmlFor="auto_predicted_name">Auto Confirm Predicted Names</label>
      <br />
      <form action="#" style={{display: 'inline-block'}} onSubmit={(e) => {
        e.preventDefault();
        const aliases = !!_csvAliasesTxtBxRef.value ? _csvAliasesTxtBxRef.value.split(',').map(trim) : []
        const charDisplayName = _charToAddNameTxtBxRef.value
        _charToAddNameTxtBxRef.value = ''
        _csvAliasesTxtBxRef.value = ''
        onAddCharacterProfile(charDisplayName, aliases)
      }}>
        <input type="text" ref={(c) => _charToAddNameTxtBxRef = c } placeholder="New primary display name"/>
        <input type="text" ref={(c) => _csvAliasesTxtBxRef = c } placeholder="comma separated list of aliases"/>
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
CharacterListPres = LogOnRender(CharacterListPres)
export default CharacterListPres