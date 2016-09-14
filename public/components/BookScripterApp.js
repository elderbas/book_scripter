// BookScripterApp
import React from 'react'
import Header from './Header'
import Footer from './Footer'

let style = {
  height: '100%',
  minHeight: '800px',
  minWidth: '719px'
}
class BookScripterApp extends React.Component {
  render() {
    return (
      <div style={style}>
        <Header />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}


export default BookScripterApp