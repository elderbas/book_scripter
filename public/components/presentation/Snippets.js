// Snippets
import React, {PropTypes} from 'react'
let jsonStringifyPretty = require('json-pretty')
class Snippets extends React.Component {
  componentDidUpdate () {
    this.refs.snipscroll.scrollTop = this.refs.snipscroll.scrollHeight
  }
  render() {
    return (
      <div>
        <h2>Snippets</h2>
        <div ref="snipscroll" style={{whiteSpace: 'pre-wrap', height: '300px', overflow: 'scroll'}}>
          {jsonStringifyPretty(this.props.snippets)}
        </div>
      </div>
    )
  }
}


Snippets.propTypes = {}
export default Snippets

