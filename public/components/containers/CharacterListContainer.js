// CharacterListContainer
import React, {PropTypes} from 'react'
import CharacterListPres from '../presentation/CharacterListPres'
import MostRecentCharactersSelectedListPres from '../presentation/MostRecentCharactersSelectedListPres'
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
    if (this.props.currentHighlightedPreSnippet === undefined) {
      return (
        <div>
          <br />
          <strong>:D</strong>
          <br /> <br />
          <button
            className="button is-primary is-bold"
            onClick={() => this.props.markCurrentBlockCompletedAndGetNext(this.props.currentBlockId, this.props.bookName)}>
            Snippets All Look Good
          </button>
        </div>
      )
    }
    return (
      <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <CharacterListPres
          onCharacterSelected={(displayName) => this.handleCharacterSelected.bind(this)(displayName, this.props)}
          currentHighlightPredictedName={this.props.currentHighlightPredictedName}
          onToggleConfig={(baseName) => this.props.handleToggledConfig(baseName)}
          currentHighlightedPreSnippet={this.props.currentHighlightedPreSnippet}
          onAddCharacterProfile={this.handleAddCharacterProfile.bind(this)}
          autoConfirmNarration={this.props.autoConfirmNarration}
          characterProfiles={this.props.characterProfiles}
          currentBlockId={this.props.currentBlockId}
          bookName={this.props.bookName}
        />
        <MostRecentCharactersSelectedListPres
          onCharacterSelected={(displayName) => this.handleCharacterSelected.bind(this)(displayName, this.props)}
          mostRecentCharacterProfilesUsed={this.props.mostRecentCharacterProfilesUsed}
        />
      </div>
    )
  }
}

CharacterListContainer.propTypes = {
  currentHighlightedPreSnippet: PropTypes.object, // add shape
  characterProfiles: PropTypes.array.isRequired,
  currentBlockId: PropTypes.number.isRequired,
  bookName: PropTypes.string.isRequired,
  // currentHighlightPredictedName, null, none, predicted name ?not sure how to do that
}

const mapStateToProps = (store) => ({
  mostRecentCharacterProfilesUsed: store.book.currentBook.mostRecentCharacterProfilesUsed,
  currentHighlightPredictedName: store.book.currentHighlightPredictedName,
  currentBlockId: store.book.currentBook.currentBlockWorkingOn.blockId,
  characterProfiles: store.book.currentBook.characterProfiles,
  autoConfirmNarration: store.config.autoConfirmNarration,
  bookName: store.book.currentBook.bookName,
})
const mapDispatchToProps = {
  markCurrentBlockCompletedAndGetNext: actions.markCurrentBlockCompletedAndGetNext,
  handleConfirmedNameOnPreSnippet: actions.handleConfirmedNameOnPreSnippet,
  addCharacterProfile: actions.addCharacterProfile,
  handleToggledConfig: actions.handleToggledConfig,
}
CharacterListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LogOnRender(CharacterListContainer)))
export default CharacterListContainer