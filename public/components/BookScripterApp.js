// BookScripterApp
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import LogOnRender from './hoc/LogOnRender'

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


BookScripterApp = LogOnRender(BookScripterApp)
export default BookScripterApp