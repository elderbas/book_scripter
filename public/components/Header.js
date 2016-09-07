// Header
import React, {PropTypes} from 'react'
import Link from 'react-router'
import '../scss/index.scss'

const Header = ({}) => {
  return (
    <div className="Header-component">
      <div className="logo">BookScripter</div>
      <ul>
        <li>
          <Link to="/libraryManager">
            <button type="button" className="btn-simple"></button>
          </Link>
        </li>
        <li>About</li>
      </ul>
    </div>
  )
}


Header.propTypes = {}
export default Header