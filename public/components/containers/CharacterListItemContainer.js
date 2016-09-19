// CharacterListItemContainer
import React from 'react'
import trim from 'lodash/trim'

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
  handleCharacterProfileChange () {
    // verify aliases are joinable back into an array
    alert(`Character name changed to ${this.state.displayName} and alias to ${this.state.aliases}`)
  }
  render() {
    let cP = this.props.characterProfile
    if (this.state.isEditing === false) {
      return (
        <li>
          <div className="is-inline-block char-list-item-config"
               onClick={() => this.setState({ isEditing: true, displayName: cP.displayName, aliases: cP.aliases.join(', ') }) }>
            <i className="fa fa-gear"></i>
          </div>
          <div className="is-inline-block char-list-item-standard-select-displayName">
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
          <div className="is-inline-block char-list-item-config" onClick={this.handleCharacterProfileChange.bind(this)}>
            <i className="fa fa-check-circle"></i>
          </div>
          <div className="is-inline-block char-list-item-isEditing-wrapper">
            <input type="text" value={this.state.displayName} placeholder="Ex. Bob Smith" onChange={this.handleNameChange.bind(this)}/>
            <input type="text" value={this.state.aliases} placeholder="Ex.- Mr. Smith, Bob, Jan's Dad" onChange={this.handleAliasChange.bind(this)} />
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