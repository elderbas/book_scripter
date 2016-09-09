// BooksUploadedList
import React, {PropTypes} from 'react'
import Loading from '../Loading'
import { Link } from 'react-router'

const ulStyle = {
  listStyleType: 'none',
  marginLeft: '15px',
  marginTop: '15px',
  lineHeight: '2.5',
}
const BooksUploadedList = ({ bookList, areBeingFetched }) => {
  let list = bookList.map(b => (
      <li key={b}>
        <Link to={`/scripter/${b}`}>{b}</Link>
      </li>
  ))
  return areBeingFetched ? <Loading text='Books being fetched' /> : (
    <div style={{marginBottom: '30px'}}>
      <h2>Books Uploaded</h2>
      <ul style={ulStyle}>
        {list}
      </ul>
    </div>
  )
}

BooksUploadedList.propTypes = {
  bookList: PropTypes.array,
  areBeingFetched: PropTypes.bool,
}
export default BooksUploadedList