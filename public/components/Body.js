// Body
import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import '../scss/index.scss'
import range from 'lodash/range'
import * as actions from '../redux/actions'

class Body extends React.Component {
  componentDidMount () {
    const { fetchBooks } = this.props
    fetchBooks()
  }
  render() {
    let booksToPick = range(5).map(i => `Game of Thrones ${i}`)
    return (
      <div className="Body-component">
        <ul>
          {booksToPick.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
    )
  }
}











const mapDispatchToProps = actions


Body.propTypes = {}
Body = connect(null, mapDispatchToProps)(Body)
export default Body