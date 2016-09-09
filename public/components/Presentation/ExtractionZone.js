// ExtractionZone
import React, {PropTypes} from 'react'
const spill = j => JSON.stringify(j)
const ExtractionZone = ({preSnippets}) => {
  return (
    <div>
      <h2>Extraction Zone</h2>
      {spill(preSnippets)}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone