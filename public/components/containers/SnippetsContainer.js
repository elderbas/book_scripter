// SnippetsContainer
import React from 'react'
import Snippets from '../presentation/Snippets'
import { connect } from 'react-redux'


const mapStateToProps = (store) => ({
  snippets: store.book.currentBook.currentBlockWorkingOn.snippets
})
const SnippetsContainer = connect(mapStateToProps)(Snippets)
export default SnippetsContainer