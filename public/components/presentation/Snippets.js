// Snippets
import React, {PropTypes} from 'react'
import LogOnRender from '../hoc/LogOnRender'
import KeepScrollBottom from '../KeepScrollBottom'

let styleByType = {
  parseError: {
    backgroundColor: 'red'
  },
  narration: {
    backgroundColor: '#d47a7a'
  },
  speech: {
    backgroundColor: 'dodgerblue'
  }
}
let snippetStyle = {
  marginBottom: '5px',
  padding: '2px'
}
let snipScrollStyle = {
  whiteSpace: 'pre-wrap', height: '170px', overflow: 'auto'
}
class Snippets extends React.Component {
  render() {
    let snippetTags = this.props.snippets.map(({text, snippetType, characterDisplayName}, index) => {
      return (
        <div key={index} style={{...snippetStyle, ...styleByType[snippetType]}}>
          {characterDisplayName}: {text}
        </div>
      )
    })

    return (
      <div>
        <h2>Snippets</h2>
        <br />
        <KeepScrollBottom style={snipScrollStyle}>
          {snippetTags}
        </KeepScrollBottom>
      </div>
    )
  }
}


Snippets.propTypes = {}
Snippets = LogOnRender(Snippets)
export default Snippets

