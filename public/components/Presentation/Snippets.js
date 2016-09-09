// Snippets
import React, {PropTypes} from 'react'
const spill = j => JSON.stringify(j)
const Snippets = ({snippets}) => {
  return (
    <div>
      <h2>Snippets</h2>
      {spill(snippets)}
    </div>
  )
}


Snippets.propTypes = {}
export default Snippets