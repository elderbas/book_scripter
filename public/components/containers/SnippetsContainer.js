// SnippetsContainer
import React from 'react'
import Snippets from '../presentation/Snippets'
import { connect } from 'react-redux'
import LogOnRender from '../hoc/LogOnRender'

let mapStateToProps = (store) => ({
  snippets: store.book.currentBook.currentBlockWorkingOn.snippets
})
const SnippetsContainer = connect(mapStateToProps)(LogOnRender(Snippets))
export default SnippetsContainer