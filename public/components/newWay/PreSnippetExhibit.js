// PreSnippetExhibit
import React, { PropTypes } from 'react'

let highlightedStyle = {
  border: '1px solid red',
  backgroundColor: 'pink',
  padding: '4px',
  borderRadius: '2px'
}
const PreSnippetExhibit = ({preSnippets, currentHighlightedPreSnippet}) => {
  if (preSnippets.length === 0) {
    return (
      <div style={{whiteSpace: 'pre-wrap'}}>
        Sweet! You're all done with this block.
        Verify Snippets are correct and confirm you're ready to move to the next block.
      </div>
    )
  }
  let preSnipTags = preSnippets.map(({text, id}) => {
    return (id === currentHighlightedPreSnippet.id)
      ? <span style={highlightedStyle} key={id}>{text}</span>
      : <span key={id}>{text}</span>
  })

  return (
    <div>
      {preSnipTags}
    </div>
  )
}


PreSnippetExhibit.propTypes = {
  preSnippets: PropTypes.array.isRequired,
  currentHighlightedPreSnippet: PropTypes.object,
}
export default PreSnippetExhibit