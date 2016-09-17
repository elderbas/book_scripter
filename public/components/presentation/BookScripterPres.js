// BookScripterPres
import React, {PropTypes} from 'react'
import SnippetsContainer from '../containers/SnippetsContainer'
import ExtractionZoneContainer from '../containers/ExtractionZoneContainer'
import LogOnRender from '../hoc/LogOnRender'
let style = {
  margin: '20px'
}


let BookScripterPres = () => {
  return (
    <div style={style}>
      <SnippetsContainer />
      <ExtractionZoneContainer />
    </div>
  )
}


BookScripterPres.propTypes = {}
BookScripterPres = LogOnRender(BookScripterPres)
export default BookScripterPres