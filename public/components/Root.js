// Root
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import BookScripterApp from './BookScripterApp'

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={BookScripterApp} />
        </Router>
      </Provider>
    )
  }
}


Root.propTypes = {}
export default Root