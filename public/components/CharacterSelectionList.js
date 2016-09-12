// CharacterSelectionList
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import '../scss/index.scss'

class CharacterSelectionList extends React.Component {
  onCharacterSelected (charDisplayName) {
    const { firstNonWhitespacePreSnippetId, handleConfirmedNameOnPreSnippet, currentBook: {bookName, lastBlockIndexWorkedOn, currentBlockWorkingOn} } = this.props
    handleConfirmedNameOnPreSnippet({
      bookName: bookName,
      blockId: lastBlockIndexWorkedOn,
      preSnippetId: firstNonWhitespacePreSnippetId,
      displayName: charDisplayName,
      snippetType: currentBlockWorkingOn.preSnippets.find(ps => ps.id === firstNonWhitespacePreSnippetId).type,
    })
  }
  render() {
    let { characterProfiles, currentBook, firstNonWhitespacePreSnippetId } = this.props
    let { preSnippets } = currentBook.currentBlockWorkingOn
    characterProfiles = [
      ...characterProfiles,
      {displayName: 'Moses', aliases: ['Mr Prophet', 'Red Sea Splitter']}
    ]
    let characterItems;
    let firstNonWhiteSpacePreSnippetId = preSnippets.find(ps => ps.id === firstNonWhitespacePreSnippetId)
    if (firstNonWhiteSpacePreSnippetId.type === 'narration') {
      characterItems = [{displayName: 'Narration', aliases: []}].map(({displayName, aliases}) => {
        return (
          <li key={displayName} onClick={() => this.onCharacterSelected(displayName)}>
            <span className="displayName">{displayName}</span>
          </li>
        )
      })
    }
    else {
      characterItems = characterProfiles.map(({displayName, aliases}) => {
        return (
          <li key={displayName} onClick={() => this.onCharacterSelected(displayName)}>
            <span className="displayName">{displayName}</span>
          </li>
        )
      })
    }

    return (
      <div className="CharacterSelectionList-component">
        <form action="#" onSubmit={(e) => {
          e.preventDefault();
          let aliasCsvTest = this._csvAliasesTxtBx.value;
          let aliases = !!aliasCsvTest ? aliasCsvTest.split(',').map(x => x.trim()) : []
          let charDisplayName = this._charToAddNameTxtBx.value
          console.log('charDisplayName', charDisplayName);
          console.log('aliases', aliases);
          this._charToAddNameTxtBx.value = this._csvAliasesTxtBx.value = '';
          console.log('currentBook', currentBook);
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
  currentBook: store.book.currentBook
})
CharacterSelectionList.propTypes = {}
CharacterSelectionList = connect(mapStateToProps, actions)(CharacterSelectionList)
export default CharacterSelectionList