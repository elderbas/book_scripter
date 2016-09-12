// SnippetsContainer
import React from 'react'
import Snippets from '../Presentation/Snippets'
import { connect } from 'react-redux'


const mapStateToProps = (store) => ({
  snippets: store.book.currentBook.currentBlockWorkingOn.snippets
})
SnippetsContainer = connect(mapStateToProps)(Snippets)
export default SnippetsContainer