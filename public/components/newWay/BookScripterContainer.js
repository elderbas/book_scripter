// BookScripterContainer
import React, {PropTypes} from 'react'
import BookScripterPres from './BookScripterPres'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../redux/actions'

class BookScripterContainer extends React.Component {
  componentDidMount () {
    this.props.getBookInfo(this.props.params.bookName)
  }

  render() {
    return (
      <BookScripterPres />
    )
  }
}


BookScripterContainer.propTypes = {}
BookScripterContainer = withRouter(connect()(BookScripterContainer))
export default BookScripterContainer