// BookScripterApp
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Body from './Body'

let BookScripterApp = (props) => {
  console.log('BookScripterAppprops', props);
  return (
    <div className="BookScripterApp-component">
      <Header />
      <Body />
      <Footer />
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookSelected: state.bookSelected
  }
}


BookScripterApp.propTypes = {}
BookScripterApp = connect(mapStateToProps)(BookScripterApp)
export default BookScripterApp