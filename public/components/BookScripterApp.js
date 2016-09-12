// BookScripterApp
import React from 'react'
import Header from './Header'
import Footer from './Footer'


class BookScripterApp extends React.Component {
  render() {
    return (
      <div className="BookScripterApp-component">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}


export default BookScripterApp