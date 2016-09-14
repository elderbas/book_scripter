// ExtractionZonePres
import React, {PropTypes} from 'react'
import CharacterListContainer from '../containers/CharacterListContainer'
import PreSnippetExhibit from '../containers/PreSnippetExhibit'

const ExtractionZonePres = (props) => {
  return (
    <div>
      <CharacterListContainer currentHighlightedPreSnippet={props.currentHighlightedPreSnippet} />
      <PreSnippetExhibit {...props} />
    </div>
  )
}


ExtractionZonePres.propTypes = {}
export default ExtractionZonePres