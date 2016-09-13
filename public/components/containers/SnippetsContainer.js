// SnippetsContainer
import React from 'react'
import SnippetsRah from '../presentation/SnippetsRah'
import { connect } from 'react-redux'


const mapStateToProps = (store) => ({
  snippets: store.book.currentBook.currentBlockWorkingOn.snippets
})
const SnippetsContainer = connect(mapStateToProps)(SnippetsRah)
export default SnippetsContainer