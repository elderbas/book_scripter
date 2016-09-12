// CharacterSelectionList
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import '../scss/index.scss'

class CharacterSelectionList extends React.Component {
  onCharacterSelected (charDisplayName) {
    const { firstNonWhitespacePreSnippet,
            handleConfirmedNameOnPreSnippet,
            currentBook: {bookName, lastBlockIndexWorkedOn, currentBlockWorkingOn} } = this.props
  let preSnippets = currentBlockWorkingOn.preSnippets
    handleConfirmedNameOnPreSnippet({
      bookName: bookName,
      blockId: lastBlockIndexWorkedOn,
      preSnippetId: firstNonWhitespacePreSnippet.id,
      displayName: charDisplayName,
      snippetType: firstNonWhitespacePreSnippet.type,
      preSnippetText: preSnippets.find(ps => firstNonWhitespacePreSnippet.id === ps.id).text
    })
  }
  render() {
    let { characterProfiles, currentBook, firstNonWhitespacePreSnippet, currentHighlightPredictedName } = this.props
    let { preSnippets } = currentBook.currentBlockWorkingOn

    if (currentHighlightPredictedName !== 'none' && currentHighlightPredictedName !== null) {
      return (
        <div className="predictedName" style={{width: '50px'}}>
          <button onClick={() => this.onCharacterSelected(currentHighlightPredictedName)}>
            {currentHighlightPredictedName}
          </button>

        </div>
      )
    }

    let characterItems, charProfilesToDisplay;
    charProfilesToDisplay = (firstNonWhitespacePreSnippet.type === 'narration')
      ? [{displayName: 'Narration', aliases: []}]
      : characterProfiles

    characterItems = charProfilesToDisplay.map(({displayName, aliases}) => {
      return (
        <li key={displayName} onClick={() => this.onCharacterSelected(displayName)}>
          <span className="displayName">{displayName}</span>
        </li>
      )
    })

    return (
      <div className="CharacterSelectionList-component">
        <form action="#" onSubmit={(e) => {
          e.preventDefault();
          let aliasCsvTest = this._csvAliasesTxtBx.value;
          let aliases = !!aliasCsvTest ? aliasCsvTest.split(',').map(x => x.trim()) : []
          let charDisplayName = this._charToAddNameTxtBx.value
          this._charToAddNameTxtBx.value = this._csvAliasesTxtBx.value = '';
          this.props.addCharacterProfile(charDisplayName, aliases, currentBook.bookName)
        }}>
          <input type="text" ref={(c) => this._charToAddNameTxtBx = c } placeholder="New primary display name"/>
          <input type="text" ref={(c) => this._csvAliasesTxtBx = c } placeholder="comma separated list of aliases"/>
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
}

const mapStateToProps = (store, ownProps) => ({
  currentBook: store.book.currentBook,
  currentHighlightPredictedName: store.book.currentHighlightPredictedName,
})
CharacterSelectionList.propTypes = {}
CharacterSelectionList = connect(mapStateToProps, actions)(CharacterSelectionList)
export default CharacterSelectionList