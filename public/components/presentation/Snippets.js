// Snippets
import React, {PropTypes} from 'react'
let jsonStringifyPretty = require('json-pretty')
import LogOnRender from '../hoc/LogOnRender'

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
  // border: '1px solid black',
  marginBottom: '5px',
  padding: '5px'
}
let snipScrollStyle = {
  whiteSpace: 'pre-wrap', height: '170px', overflow: 'scroll'
}
class Snippets extends React.Component {
  componentDidUpdate () {
    this.refs.snipscroll.scrollTop = this.refs.snipscroll.scrollHeight
  }
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
        <div ref="snipscroll" style={snipScrollStyle}>
          {snippetTags}
        </div>
      </div>
    )
  }
}


Snippets.propTypes = {}
Snippets = LogOnRender(Snippets)
export default Snippets

