// PreSnippetExhibit
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import LogOnRender from '../hoc/LogOnRender'

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

let PreSnippetExhibit = ({preSnippets, currentHighlightedPreSnippet, idOfPreviousPreSnippetHighlighted}) => {
  if (currentHighlightedPreSnippet === undefined) {
    return (
      <div>
        <br />
        Sweet! You're all done with this block. Verify Snippets are correct and confirm you're ready to move to the next block.
      </div>
    )
  }
  const quantityShadowsBeforeCurrhighlightIdAllowed = 6
  const isVisible = (idBeingExamined) => idBeingExamined > currentHighlightedPreSnippet.id
  const isShadow = (idBeingExamined) => idBeingExamined >= currentHighlightedPreSnippet.id - quantityShadowsBeforeCurrhighlightIdAllowed && idBeingExamined < currentHighlightedPreSnippet.id && idBeingExamined >= 0
  let preSnipTags = []
  preSnippets.forEach(({text, id}) => {
    if (id === currentHighlightedPreSnippet.id) {
      preSnipTags.push(<span style={highlightedStyle} key={id}>{text}</span>)
    }
    else if (isShadow(id)) {
      preSnipTags.push(<span style={shadowStyle} key={id}>{text}</span>)
    }
    else if (isVisible(id)) {
      preSnipTags.push(<span key={id}>{text}</span>)
    }
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
PreSnippetExhibit = LogOnRender(PreSnippetExhibit)
export default PreSnippetExhibit