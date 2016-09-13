// ExtractionZonePres
import React, {PropTypes} from 'react'
import CharacterListContainer from './CharacterListContainer'
import PreSnippetExhibit from './PreSnippetExhibit'

const ExtractionZonePres = ({preSnippets, currentHighlightedPreSnippet}) => {
  const props = { preSnippets, currentHighlightedPreSnippet }
  return (
    <div>
      <CharacterListContainer {...props} />
      <PreSnippetExhibit {...props} />
    </div>
  )
}


ExtractionZonePres.propTypes = {}
export default ExtractionZonePres