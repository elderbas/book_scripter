// Snippets
import React, { PropTypes } from 'react'
let jsonStringifyPretty = require('json-pretty')
const spill = j => jsonStringifyPretty(j)
const Snippets = ({snippets}) => {
  return (
    <div style={{whiteSpace: 'pre-wrap'}}>
      <h2>Snippets</h2>
      {spill(snippets)}
    </div>
  )
}


Snippets.propTypes = {
  snippets: PropTypes.array.isRequired
}
export default Snippets