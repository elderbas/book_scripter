// PreSnippetExhibit
import React, { PropTypes } from 'react'

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
      ? <span className="highlightedPreSnippet" key={id}>{text}</span>
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
}
export default PreSnippetExhibit