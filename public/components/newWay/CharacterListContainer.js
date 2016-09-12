// CharacterListContainer
import React, {PropTypes} from 'react'
import CharacterListPres from './CharacterListPres'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'

class CharacterListContainer extends React.Component {
  getNameSuggestion () {
    const { bookName, currentBlockId, currentHighlightedPreSnippet} = this.props
    const { getNameSuggestion, params, currentBook } = this.props;
    getNameSuggestion({
      bookName,
      blockId: currentBlockId,
      speechPreSnippetIdSelected: currentHighlightedPreSnippet.id
    })
  }
  handleAddCharacterProfile (displayName, aliases) {
    this.props.addCharacterProfile(displayName, aliases, this.props.bookName)
  }
  handleCharacterSelected (charDisplayName) {
    const { bookName, currentBlockId, currentHighlightedPreSnippet} = this.props
    this.props.handleConfirmedNameOnPreSnippet({
      bookName,
      blockId: currentBlockId,
      preSnippetId: currentHighlightedPreSnippet.id,
      displayName: charDisplayName,
      snippetType: currentHighlightedPreSnippet.type,
      preSnippetText: props.currentHighlightedPreSnippet.text,
    })
  }

  render() {
    const { currentHighlightedPreSnippet, preSnippets, characterProfiles, currentHighlightPredictedName } = this.props;

    return (
      <CharacterListPres
        currentHighlightedPreSnippet={currentHighlightedPreSnippet}
        characterProfiles={characterProfiles}
        currentHighlightPredictedName={currentHighlightPredictedName}
        onCharacterSelected={this.handleCharacterSelected.bind(this)}
        onAddCharacterProfile={this.handleAddCharacterProfile.bind(this)}
      />
    )
  }
}

CharacterListContainer.propTypes = {
  preSnippets: PropTypes.array.isRequired,
  currentHighlightedPreSnippet: PropTypes.object.isRequired,
  characterProfiles: PropTypes.array.isRequired,
  bookName: PropTypes.string.isRequired,
  // currentHighlightPredictedName, null, none, predicted name ?not sure how to do that
}

const mapStateToProps = (store) => ({
  characterProfiles: store.book.currentBook.characterProfiles,
  bookName: store.book.currentBook.bookName,
  currentHighlightPredictedName: store.book.currentHighlightPredictedName,
  currentBlockId: store.book.currentBook.lastBlockIndexWorkedOn
})
const mapDispatchToProps = (dispatch) => ({
  addCharacterProfile: actions.addCharacterProfile,
  handleConfirmedNameOnPreSnippet: actions.handleConfirmedNameOnPreSnippet,
})
CharacterListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CharacterListContainer))
export default CharacterListContainer