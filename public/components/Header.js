// Header
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import '../scss/index.scss'

const Header = () => {
  return (
    <div className="hero-head is-primary is-bold hero">
      <header className="nav">
        <div className="container">
          <div className="nav-left">
            <div className="nav-item title" alt="Logo">BookScripter</div>
          </div>
          <div className="nav-right nav-menu">
            <Link to="/" className="nav-item">
              <button type="button" className="button is-small">Library Manager</button>
            </Link>
            <Link to="/about" className="nav-item">
              <button type="button" className="button is-small">About</button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}


Header.propTypes = {}

export default Header