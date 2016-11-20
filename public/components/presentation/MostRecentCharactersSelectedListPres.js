// MostRecentCharactersSelectedListPres
import React from 'react'
import sortBy from 'lodash/sortBy'

const MostRecentCharactersSelectedListPres = ({onCharacterSelected, mostRecentCharacterProfilesUsed}) => {
  if (mostRecentCharacterProfilesUsed.length === 0) {
    return <div></div>
  }

  let characterItems = sortBy(mostRecentCharacterProfilesUsed, 'displayName').map((cP) => {
    return (
      <li key={cP.displayName}>
        <div className="is-inline-block char-list-item-standard-select-displayName" onClick={() => onCharacterSelected(cP.displayName)}>
          <span> {cP.displayName} </span>
        </div>
      </li>
    )
  })
  return (
    <div className="CharacterSelectionList-component">
      <h3><strong>Most Recent Characters Selected</strong></h3>
      <div className="charListWrapper">
        <ul>
          {characterItems}
        </ul>
      </div>
    </div>
  )
}

export default MostRecentCharactersSelectedListPres