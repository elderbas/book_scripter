// Body
import React, {PropTypes} from 'react'
import '../scss/index.scss'
import range from 'lodash/range'

const Body = ({}) => {
  let booksToPick = range(5).map(i => `Game of Thrones ${i}`)
  return (
    <div className="Body-component">
      <ul>
        {booksToPick.map((x, i) => <li key={i}>{x}</li>)}
      </ul>
    </div>
  )
}


Body.propTypes = {}
export default Body