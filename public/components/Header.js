// Header
import React from 'react'
import { Link } from 'react-router'
import '../scss/index.scss'
import LogOnRender from './hoc/LogOnRender'

let Header = () => {
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


Header = LogOnRender(Header)
export default Header