// ExtractionZone
import React, {PropTypes} from 'react'
import CharacterSelectionList from '../CharacterSelectionList'



const ExtractionZone = ({ preSnippets, firstSpeechIndex, characterProfiles }) => {
  // console.log('ExtractionZone rendering', preSnippets[firstSpeechIndex]);
  let showCharacterSelectionList = false;
  let nameToShowIfSuggested = null;
  let preSnipTags = preSnippets.map(({text, id, predictedCharacterNameNormalized}, index) => {
    if (firstSpeechIndex === index) {
      // console.log('personConfirmedNormalized', predictedCharacterNameNormalized);
      if (predictedCharacterNameNormalized === 'none') {
        // console.log('SHOULD BE TRUE');
        showCharacterSelectionList = true;
      }
      else if (predictedCharacterNameNormalized !== null) {
        nameToShowIfSuggested = predictedCharacterNameNormalized;
      }
      return <span className="highlightedPreSnippet" key={id}>{text}</span>
    }
    return <span key={id}>{text}</span>
  })
  // console.log('showCharacterSelectionList', showCharacterSelectionList);
  // console.log('nameToShowIfSuggested', nameToShowIfSuggested);
  return (
    <div className="ExtractionZone-component">
      <h2>Extraction Zone</h2>
      <br /><br />
      {showCharacterSelectionList ?
        <div className="characterList">
          (No prediction found) Pick people from here
          <CharacterSelectionList characterProfiles={characterProfiles} />
        </div> :
        '' }
      {nameToShowIfSuggested ? <div className="suggestionBox">{nameToShowIfSuggested}</div> : '' }

      {preSnipTags}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone