// KeepScrollBottom
import React, { PropTypes } from 'react'

class KeepScrollBottom extends React.Component {
  componentDidUpdate () {
    this.refs.snipscroll.scrollTop = this.refs.snipscroll.scrollHeight
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