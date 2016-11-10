// CharacterListContainer
import React, {PropTypes} from 'react'
import CharacterListPres from '../presentation/CharacterListPres'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'
import LogOnRender from '../hoc/LogOnRender'
import get from 'lodash/get'
const _ = {
  get: get
}

/* this component is a bit hefty */


/* this is handling
 * NEW CHARACTERS being added
 * CURRENT character being selected
 * PREDICTED CHARACTER displaying and able to be selected*/
class CharacterListContainer extends React.Component {
  handleAddCharacterProfile (displayName, aliases) {
    if (displayName.trim('') === '') {
      return alert('Need a valid displayName')
    }
    this.props.addCharacterProfile(displayName, aliases, this.props.bookName)
  }
  handleCharacterSelected (charDisplayName, someProps) {
    console.log('handleCharacterSelected!', someProps);
    someProps.handleConfirmedNameOnPreSnippet({
      bookName: someProps.bookName,
      blockId: someProps.currentBlockId,
      preSnippetId: someProps.currentHighlightedPreSnippet.id,
      displayName: charDisplayName,
      snippetType: someProps.currentHighlightedPreSnippet.type,
      preSnippetText: someProps.currentHighlightedPreSnippet.text,
    })
  }

  // set as narration if it's a narration type
  componentWillReceiveProps (nextProps) {
    let thisCurrHighlightPreSnippet = _.get(this, 'props.currentHighlightedPreSnippet')
    let nextCurrHighlightPreSnippet = _.get(nextProps, 'currentHighlightedPreSnippet')
    // dont have highlighted pre snippet yet
    if (!thisCurrHighlightPreSnippet || !nextCurrHighlightPreSnippet) {
      return
    }
    // Coming up first time on next highlighted pre snippet
    if (thisCurrHighlightPreSnippet.id !== nextCurrHighlightPreSnippet.id) {
      if (nextCurrHighlightPreSnippet.type === 'narration' && nextProps.autoConfirmNarration === true) {
        return this.handleCharacterSelected('Narration', nextProps)
      }
    }
  }

  componentDidMount() {
    if (_.get(this, 'props.currentHighlightedPreSnippet.type') === 'narration') {
      this.handleCharacterSelected('Narration', this.props)
    }
  }
  render() {
    return (
      <CharacterListPres
        autoConfirmNarration={this.props.autoConfirmNarration}
        currentHighlightedPreSnippet={this.props.currentHighlightedPreSnippet}
        characterProfiles={this.props.characterProfiles}
        currentHighlightPredictedName={this.props.currentHighlightPredictedName}
        onCharacterSelected={(x) => this.handleCharacterSelected.bind(this)(x, this.props)}
        onToggleConfig={(baseName) => this.props.handleToggledConfig(baseName)}
        currentBlockId={this.props.currentBlockId}
        bookName={this.props.bookName}
        markCurrentBlockCompletedAndGetNext={this.props.markCurrentBlockCompletedAndGetNext}
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
  currentBlockId: store.book.currentBook.currentBlockWorkingOn.blockId,
  autoConfirmNarration: store.config.autoConfirmNarration,
})
const mapDispatchToProps = {
  addCharacterProfile: actions.addCharacterProfile,
  handleConfirmedNameOnPreSnippet: actions.handleConfirmedNameOnPreSnippet,
  handleToggledConfig: actions.handleToggledConfig,
  markCurrentBlockCompletedAndGetNext: actions.markCurrentBlockCompletedAndGetNext,
}
CharacterListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOnRender(CharacterListContainer)))
export default CharacterListContainer