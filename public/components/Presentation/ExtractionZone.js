// ExtractionZone
import React, {PropTypes} from 'react'
const spill = j => JSON.stringify(j)
const ExtractionZone = ({ preSnippets }) => {
  console.log('preSnippets', preSnippets);
  let preSnipTags = preSnippets.map(({text, id}) => {
    return (
      <span key={id}>{text}</span>
    )
  })
  return (
    <div style={{whiteSpace: 'pre-wrap'}}>
      <h2>Extraction Zone</h2>
      {preSnipTags}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone