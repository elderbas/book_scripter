// ExtractionZonePres
import React, {PropTypes} from 'react'
import CharacterListContainer from '../containers/CharacterListContainer'
import PreSnippetExhibit from '../containers/PreSnippetExhibit'
import LogOnRender from '../hoc/LogOnRender'

let ExtractionZonePres = (props) => {
  return (
    <div>
      <CharacterListContainer currentHighlightedPreSnippet={props.currentHighlightedPreSnippet} />
      <PreSnippetExhibit {...props} />
    </div>
  )
}


ExtractionZonePres.propTypes = {}
ExtractionZonePres = LogOnRender(ExtractionZonePres)
export default ExtractionZonePres