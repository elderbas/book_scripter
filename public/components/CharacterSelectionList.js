// CharacterSelectionList
import React, {PropTypes} from 'react'
import '../scss/index.scss'

class CharacterSelectionList extends React.Component {
  onCharacterSelected (charDisplayName) {
    console.log(`Character: ${charDisplayName} selected for index ${this.props.firstSpeechIndex}`);
    
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


CharacterSelectionList.propTypes = {}
export default CharacterSelectionList