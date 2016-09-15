// CharacterListContainer
import React, {PropTypes} from 'react'
import CharacterListPres from '../presentation/CharacterListPres'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'


/* this is handling
 * NEW CHARACTERS being added
 * CURRENT character being selected
 * PREDICTED CHARACTER displaying and able to be selected*/
class CharacterListContainer extends React.Component {
  getNameSuggestion (newHighlightedPreSnippet) {
    console.log('inside getNameSuggestion');
    // debugger;
    if (newHighlightedPreSnippet.type === 'speech') {
      this.props.getNameSuggestion({
        bookName: this.props.bookName,
        blockId: this.props.currentBlockId,
        speechPreSnippetIdSelected: newHighlightedPreSnippet.id
      })
    }

  }



  handleAddCharacterProfile (displayName, aliases) {
    if (displayName.trim('') === '') {
      return alert('Need a valid displayName')
    }
    this.props.addCharacterProfile(displayName, aliases, this.props.bookName)
  }
  handleCharacterSelected (charDisplayName, someProps) {
    console.log('inside handleCharacterSelected');
    someProps.handleConfirmedNameOnPreSnippet({
      bookName: someProps.bookName,
      blockId: someProps.currentBlockId,
      preSnippetId: someProps.currentHighlightedPreSnippet.id,
      displayName: charDisplayName,
      snippetType: someProps.currentHighlightedPreSnippet.type,
      preSnippetText: someProps.currentHighlightedPreSnippet.text,
    })
  }

  // automatically get predicted name when the preSnippet coming up is speech type
  componentWillReceiveProps (nextProps) {
    console.log('inside componentWillReceiveProps');
    if (this.props.currentHighlightedPreSnippet && nextProps.currentHighlightedPreSnippet) {
      let { currentHighlightPredictedName, currentHighlightedPreSnippet } = nextProps

      // automatically just confirm narration types
      if (this.props.currentHighlightedPreSnippet.id !== nextProps.currentHighlightedPreSnippet.id) {
        if (currentHighlightedPreSnippet.type === 'narration') {
          this.handleCharacterSelected('Narration', nextProps)
        }
      }

      // current one coming in is speech type and we havent gotten back a response yet
      if (currentHighlightedPreSnippet && currentHighlightedPreSnippet.type === 'speech' && currentHighlightPredictedName === null) {
        this.getNameSuggestion(nextProps.currentHighlightedPreSnippet)
      }
    }
  }

  componentDidMount() {
    if (this.props.currentHighlightedPreSnippet) {
      if (this.props.currentHighlightedPreSnippet.type === 'narration') {
        this.handleCharacterSelected('Narration', this.props)
      }
    }
  }
  render() {
    return (
      <CharacterListPres
        currentHighlightedPreSnippet={this.props.currentHighlightedPreSnippet}
        characterProfiles={this.props.characterProfiles}
        currentHighlightPredictedName={this.props.currentHighlightPredictedName}
        onCharacterSelected={(x) => this.handleCharacterSelected.bind(this)(x, this.props)}
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
  toggleAutoConfirmNarration: actions.toggleAutoConfirmNarration,
}
CharacterListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CharacterListContainer))
export default CharacterListContainer