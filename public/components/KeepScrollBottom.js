// KeepScrollBottom
import React, { PropTypes } from 'react'

class KeepScrollBottom extends React.Component {
  setScrollVal () {
    this.refs.snipscroll.scrollTop = this.refs.snipscroll.scrollHeight
  }
  componentDidUpdate () {
    this.setScrollVal()
  }
  componentDidMount () {
    this.setScrollVal()
  }

  render() {
    return (
      <div style={this.props.style} ref="snipscroll">
        {this.props.children}
      </div>
    )
  }
}


KeepScrollBottom.propTypes = {}
export default KeepScrollBottom
