// Header
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import '../scss/index.scss'

const Header = () => {
  return (
    <div className="Header-component">
      <div className="logo">BookScripter</div>
      <ul>
        <li>
          <Link to="/">
            <button type="button" className="pure-button pure-button-active">Library Manager</button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <button type="button" className="pure-button pure-button-active">About</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}


Header.propTypes = {}
export default Header