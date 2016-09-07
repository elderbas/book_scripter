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
    const { bookList } = this.props
    console.log('PROPS IN RENDER!!!', this.props);
    return (
      <div className="Body-component">
        <ul>
          {JSON.stringify(bookList)}
        </ul>
      </div>
    )
  }
}








const getBookList = state => state.books.list

const mapStateToProps = (state) => {
  return {
    bookList: getBookList(state).concat(['Billy Bob'])
  }
}
const mapDispatchToProps = actions


Body.propTypes = {}
Body = connect(mapStateToProps, mapDispatchToProps)(Body)
export default Body
