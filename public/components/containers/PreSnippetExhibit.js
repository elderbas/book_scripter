// PreSnippetExhibit
import React, { PropTypes } from 'react'
import { Link } from 'react-router'


let preSnippetListWrapper = {
  whiteSpace: 'pre-wrap',
  marginTop: '10px'
}
let highlightedStyle = {
  border: '1px solid red',
  backgroundColor: 'pink',
  padding: '4px',
  borderRadius: '2px'
}
let shadowStyle = {
  color: '#cacaca'
}

const PreSnippetExhibit = ({preSnippets, currentHighlightedPreSnippet, idOfPreviousPreSnippetHighlighted}) => {
  if (currentHighlightedPreSnippet === undefined) {
    return (
      <div style={preSnippetListWrapper}>
        Sweet! You're all done with this block.
        Verify Snippets are correct and confirm you're ready to move to the next block.
      </div>
    )
  }
  let indexToShowPreSnippetsIncludingShadow = (idOfPreviousPreSnippetHighlighted === -1) ? 0 : idOfPreviousPreSnippetHighlighted
  let preSnipTags = preSnippets.slice(indexToShowPreSnippetsIncludingShadow).map(({text, id}) => {
    if (id === currentHighlightedPreSnippet.id) { return <span style={highlightedStyle} key={id}>{text}</span> }
    else if (id === idOfPreviousPreSnippetHighlighted) { return <span style={shadowStyle} key={id}>{text}</span> }
    else { return <span key={id}>{text}</span> }
  })
  return (
    <div style={preSnippetListWrapper}>
      {preSnipTags}

    </div>
  )
}


PreSnippetExhibit.propTypes = {
  preSnippets: PropTypes.array.isRequired,
  currentHighlightedPreSnippet: PropTypes.object,
}
export default PreSnippetExhibit