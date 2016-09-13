// CharacterListContainer
import React, {PropTypes} from 'react'
import CharacterListPres from './CharacterListPres'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'


/* this is handling
 * NEW CHARACTERS being added
 * CURRENT character being selected
 * PREDICTED CHARACTER displaying and able to be selected*/
class CharacterListContainer extends React.Component {
  getNameSuggestion () {
    this.props.getNameSuggestion({
      bookName: this.props.bookName,
      blockId: this.props.currentBlockId,
      speechPreSnippetIdSelected: this.props.currentHighlightedPreSnippet.id
    })
  }
  // automatically get predicted name when the preSnippet coming up is speech type
  componentWillReceiveProps (nextProps) {
    if (this.props.currentHighlightedPreSnippet && nextProps.currentHighlightedPreSnippet) {
      let { currentHighlightPredictedName, currentHighlightedPreSnippet } = nextProps
      // current one coming in is speech type and we havent gotten back a response yet
      if (currentHighlightedPreSnippet && currentHighlightedPreSnippet.type === 'speech' && currentHighlightPredictedName === null) {
        this.getNameSuggestion(currentHighlightedPreSnippet.id)
      }
    }
  }

  handleAddCharacterProfile (displayName, aliases) {
    this.props.addCharacterProfile(displayName, aliases, this.props.bookName)
  }
  handleCharacterSelected (charDisplayName) {
    this.props.handleConfirmedNameOnPreSnippet({
      bookName: this.props.bookName,
      blockId: this.props.currentBlockId,
      preSnippetId: this.props.currentHighlightedPreSnippet.id,
      displayName: charDisplayName,
      snippetType: this.props.currentHighlightedPreSnippet.type,
      preSnippetText: this.props.currentHighlightedPreSnippet.text,
    })
  }
  render() {
    return (
      <CharacterListPres
        currentHighlightedPreSnippet={this.props.currentHighlightedPreSnippet}
        characterProfiles={this.props.characterProfiles}
        currentHighlightPredictedName={this.props.currentHighlightPredictedName}
        onCharacterSelected={this.handleCharacterSelected.bind(this)}
        onAddCharacterProfile={this.handleAddCharacterProfile.bind(this)}
      />
    )
  }
}

CharacterListContainer.propTypes = {
  currentHighlightedPreSnippet: PropTypes.object, // add shape

  currentBlockId: PropTypes.number.isRequired,
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
const mapDispatchToProps = {
  addCharacterProfile: actions.addCharacterProfile,
  handleConfirmedNameOnPreSnippet: actions.handleConfirmedNameOnPreSnippet,
  getNameSuggestion: actions.getNameSuggestion,
}
CharacterListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CharacterListContainer))
export default CharacterListContainer