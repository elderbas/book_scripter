// CharacterListPres
import React from 'react'
import trim from 'lodash/trim'
import sortBy from 'lodash/sortBy'
import LogOnRender from '../hoc/LogOnRender'
import CharacterListItemContainer from '../containers/CharacterListItemContainer'
const predictedNameBtnStyle = {
  padding: '5px'
}
const gearStyle = {
  position: 'relative',
  left: '-131px'
}
let CharacterListPres = ({ onAddCharacterProfile, currentHighlightedPreSnippet, currentBlockId, autoConfirmNarration,
  markCurrentBlockCompletedAndGetNext, bookName, characterProfiles, onCharacterSelected, onToggleConfig}) => {


  let characterItems, charProfilesToDisplay;
  // Note: commenting this out because visually it's awkward to replace the entire thing with only 1 item, and then go back. Feels like bad UX
  // charProfilesToDisplay = (currentHighlightedPreSnippet.type === 'narration')
  //   ? [{displayName: 'Narration', aliases: []}]
  //   : characterProfiles
  charProfilesToDisplay = characterProfiles
  characterItems = sortBy(charProfilesToDisplay, 'displayName').map((charProfile) => (
    <CharacterListItemContainer
      onCharacterConfirmed={onCharacterSelected}
      characterProfile={charProfile}
      key={charProfile.displayName}
    />
  ))

  let _charToAddNameTxtBxRef, _csvAliasesTxtBxRef
  return (
    <div className="CharacterSelectionList-component">
      {/*<input type="checkbox"*/}
             {/*checked={autoConfirmNarration}*/}
             {/*name="auto_narration"*/}
             {/*onChange={() => onToggleConfig('CONFIRM_NARRATION')} />*/}
      {/*<label htmlFor="auto_narration"> Auto Confirm Narration types</label>*/}
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
        <button type="submit" className="button is-small"><i className="fa fa-plus"></i></button>
      </form>
      <div className="charListWrapper">
        <div style={{overflow: 'auto', maxHeight: '310px'}}>
          <ul>{characterItems}</ul>
        </div>
      </div>
    </div>
  )
}


CharacterListPres.propTypes = {}
CharacterListPres = LogOnRender(CharacterListPres)
export default CharacterListPres