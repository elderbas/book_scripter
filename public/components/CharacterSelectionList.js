// CharacterSelectionList
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import * as actions from '../redux/actions'
import '../scss/index.scss'

class CharacterSelectionList extends React.Component {
  onCharacterSelected (charDisplayName) {
    const { firstSpeechPreSnippetIndex, handleConfirmedNameOnPreSnippet, currentBook } = this.props
    console.log(`Character: ${charDisplayName} selected for index ${firstSpeechPreSnippetIndex}`);
    handleConfirmedNameOnPreSnippet({
      bookName: currentBook.bookName,
      blockId: currentBook.lastBlockIndexWorkedOn,
      preSnippetId: firstSpeechPreSnippetIndex,
      displayName: charDisplayName
    })
  }
  render() {
    // {displayName: 'Bob', aliases: []}
    let { characterProfiles } = this.props
    characterProfiles = [
      {displayName: 'Bob Harding', aliases: ['Mr Harding', 'Bob']},
      {displayName: 'Moses', aliases: ['Mr Prophet', 'Red Sea Splitter']}
    ]
    let characterItems = characterProfiles.map(({displayName, aliases}) => {
      return (
        <li key={displayName} onClick={() => this.onCharacterSelected(displayName)}>
          <span className="displayName">{displayName}</span>
        </li>
      )
    })

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