// CharacterListPres
import React, {PropTypes} from 'react'
import trim from 'lodash/trim'
import LogOnRender from '../hoc/LogOnRender'
import CharacterListItemContainer from '../containers/CharacterListItemContainer'
import KeepScrollBottom from '../KeepScrollBottom'
const predictedNameBtnStyle = {
  padding: '5px'
}
const gearStyle = {
  position: 'relative',
  left: '-131px'
}
let CharacterListPres = ({ onAddCharacterProfile, currentHighlightedPreSnippet, currentBlockId,
  autoConfirmNarration, autoConfirmPredictedName, markCurrentBlockCompletedAndGetNext, bookName,
characterProfiles, currentHighlightPredictedName, onCharacterSelected, onToggleConfig}) => {
    if (currentHighlightedPreSnippet === undefined) {
      return (
        <div>
          <br />
          <strong>:D</strong>
          <br /> <br />
          <button
            className="button is-primary is-bold"
            onClick={() => markCurrentBlockCompletedAndGetNext(currentBlockId, bookName)}>
            Snippets All Look Good
          </button>
        </div>
      )
    }
    /* replace with a Spinner of the same size of the character list? There's no reason to completely remove this
     * that only makes the page go swiwompus. And/Or disable the character list stuff so they can't accidently
     * select something twice? */
    // if (currentHighlightPredictedName !== 'none' && currentHighlightPredictedName !== null) {
    //   return (
    //     <div style={{width: '50px'}}>
    //       <button style={predictedNameBtnStyle} onClick={() => onCharacterSelected(currentHighlightPredictedName)}>
    //         {currentHighlightPredictedName}
    //       </button>
    //     </div>
    //   )
    // }


  let characterItems, charProfilesToDisplay;
  charProfilesToDisplay = (currentHighlightedPreSnippet.type === 'narration')
    ? [{displayName: 'Narration', aliases: []}]
    : characterProfiles

  characterItems = charProfilesToDisplay.map((charProfile) => (
    <CharacterListItemContainer
      onCharacterConfirmed={onCharacterSelected}
      characterProfile={charProfile}
      key={charProfile.displayName}
    />
  ))

  let _charToAddNameTxtBxRef, _csvAliasesTxtBxRef
  return (
    <div className="CharacterSelectionList-component">
      <input type="checkbox"
             checked={autoConfirmNarration}
             name="auto_narration"
             onChange={() => onToggleConfig('CONFIRM_NARRATION')} />
      <label htmlFor="auto_narration"> Auto Confirm Narration types</label>
      <br />
      <input type="checkbox"
             checked={autoConfirmPredictedName}
             name="auto_predicted_name"
             onChange={() => onToggleConfig('CONFIRM_PREDICTED_NAME')}/>
      <label htmlFor="auto_predicted_name"> Auto Confirm Predicted Names</label>
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
          <KeepScrollBottom style={{overflow: 'auto', maxHeight: '100px'}}>
            <ul>{characterItems}</ul>
          </KeepScrollBottom>
        </div>
    </div>
  )
}


CharacterListPres.propTypes = {}
CharacterListPres = LogOnRender(CharacterListPres)
export default CharacterListPres