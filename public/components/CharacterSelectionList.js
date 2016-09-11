// CharacterSelectionList
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import '../scss/index.scss'

class CharacterSelectionList extends React.Component {
  onCharacterSelected (charDisplayName) {
    const { firstNonWhitespacePreSnippetId, handleConfirmedNameOnPreSnippet,
      currentBook: {bookName, lastBlockIndexWorkedOn, currentBlockWorkingOn} } = this.props
    let snippetType = currentBlockWorkingOn.preSnippets.find(ps => ps.id === firstNonWhitespacePreSnippetId).type
    handleConfirmedNameOnPreSnippet({
      bookName: bookName,
      blockId: lastBlockIndexWorkedOn,
      preSnippetId: firstNonWhitespacePreSnippetId,
      displayName: charDisplayName,
      snippetType,
    })
  }
  render() {
    let { characterProfiles, currentBook, firstNonWhitespacePreSnippetId } = this.props
    let { preSnippets } = currentBook.currentBlockWorkingOn
    characterProfiles = [
      {displayName: 'Bob Harding', aliases: ['Mr Harding', 'Bob']},
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
        <ul>
          {characterItems}
        </ul>
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