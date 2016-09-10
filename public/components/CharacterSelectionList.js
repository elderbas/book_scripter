// CharacterSelectionList
import React, {PropTypes} from 'react'

class CharacterSelectionList extends React.Component {
  render() {
    // {displayName: 'Bob', aliases: []}
    let { characterProfiles } = this.props
    characterProfiles = [{displayName: 'Bob', aliases: []}]
    let characterItems = characterProfiles.map(({displayName, aliases}) => {
      return (
        <li>
          <span className="displayName">{displayName}</span>
          <span className="aliases">{aliases.map((name, i) => {
            return <span>{i !== 0 ? ', ' : ''}{name}</span>
          })}</span>
        </li>
      )
    })
    return (
      <div>
        <ul>
          {characterItems}
        </ul>
      </div>
    )
  }
}


CharacterSelectionList.propTypes = {}
export default CharacterSelectionList