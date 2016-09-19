// CharacterListItemContainer
import React from 'react'
import trim from 'lodash/trim'
import isEqual from 'lodash/isEqual'

class CharacterListItemContainer extends React.Component {
  constructor (props) {
    super(props)
    // these are just temp to hold while they're typing.
    this.state = { isEditing: false, displayName: '', aliases: '' }
  }
  handleNameChange (e) {
    this.setState({ displayName: e.target.value })
  }
  handleAliasChange (e) {
    this.setState({ aliases: e.target.value })
  }
  handleCharacterProfileChange (charProfile) {
    let displayNameSame = charProfile.displayName === this.state.displayName.trim()
    let aliasesSame = true;
    if (charProfile.aliases.length === 0 && this.state.aliases === '') {
      aliasesSame = isEqual(charProfile.aliases.sort(), this.state.aliases.split(',').map(trim).sort())
    }
    // verify aliases are joinable back into an array
    if (displayNameSame || aliasesSame) {
      alert('Noticed a difference - sending off change')
    } else {
      alert('No change made.')
    }
  }
  handleEditClick (displayName, aliases) {
    this.setState({ isEditing: true, displayName, aliases: aliases.join(', ') })
  }
  render() {
    let cP = this.props.characterProfile
    if (this.state.isEditing === false) {
      return (
        <li>
          <div className="is-inline-block char-list-item-config" onClick={() => this.handleEditClick(cP.displayName, cP.aliases)}>
            <i className="fa fa-gear"></i>
          </div>
          <div className="is-inline-block char-list-item-standard-select-displayName" onClick={() => this.props.onCharacterConfirmed(cP.displayName)}>
            <span> {cP.displayName} </span>
          </div>
        </li>
      )
    }
    else if (this.state.isEditing === true) {
      return (
        <li>
          <div className="is-inline-block char-list-item-config" onClick={() => this.setState({ isEditing: false }) }>
            <i className="fa fa-times"></i>
          </div>
          <div className="is-inline-block char-list-item-config" onClick={() => this.handleCharacterProfileChange(cP)}>
            <i className="fa fa-check-circle"></i>
          </div>
          <div className="is-inline-block char-list-item-isEditing-wrapper">
            <input type="text" name="displayName" value={this.state.displayName} placeholder="Ex. Bob Smith" onChange={this.handleNameChange.bind(this)}/>
            <input type="text" name="aliases" value={this.state.aliases} placeholder="Ex.- Mr. Smith, Bob, Jan's Dad" onChange={this.handleAliasChange.bind(this)} />
          </div>
        </li>
      )
    }
    else { // isEditing
      return (
        <li>
          <input type="text" value={cP.displayName} />
          <input type="text" value={cP.aliases.join(',')} />
        </li>
      )
    }
  }
}


export default CharacterListItemContainer