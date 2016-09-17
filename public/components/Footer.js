// Footer
import React, {PropTypes} from 'react'
import LogOnRender from './hoc/LogOnRender'
import '../scss/index.scss'

let Footer = () => {
  return (
    <div className="Footer-component">
      <div className="copyright">
        Brian Schermerhorn
      </div>
    </div>
  )
}


Footer.propTypes = {}
Footer = LogOnRender(Footer)
export default Footer