// ExtractionZone
import React, {PropTypes} from 'react'
const spill = j => JSON.stringify(j)
import findIndex from 'lodash/findIndex'



const ExtractionZone = ({ preSnippets }) => {
  let firstSpeechIndex = findIndex(preSnippets, ps => ps.type === 'speech')
  let preSnipTags = preSnippets.map(({text, id, type}, index) => {
    if (firstSpeechIndex === index) {
      return <span className="highlightedPreSnippet" key={id}>{text}</span>
    }
    return <span key={id}>{text}</span>
  })
  return (
    <div className="ExtractionZone-component">
      <h2>Extraction Zone</h2>
      {preSnipTags}
    </div>
  )
}


ExtractionZone.propTypes = {}
export default ExtractionZone