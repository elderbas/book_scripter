// BookScripterPres
import React, {PropTypes} from 'react'
import SnippetsContainer from '../containers/SnippetsContainer'
import ExtractionZoneContainer from '../containers/ExtractionZoneContainer'

let style = {
  margin: '20px'
}


const BookScripterPres = () => {
  return (
    <div style={style}>
      <SnippetsContainer />
      <ExtractionZoneContainer />
    </div>
  )
}


BookScripterPres.propTypes = {}
export default BookScripterPres