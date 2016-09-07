// Root
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import BookScripterApp from './BookScripterApp'
import BookListManager from './BookListManager'
import TestComponent from './TestComponent'

class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={browserHistory}>
          <Route path="/" component={BookScripterApp}>
            <IndexRoute component={BookListManager} />
            <Route path="/test123" component={TestComponent} />
          </Route>
        </Router>
      </Provider>
    )
  }
}


Root.propTypes = {}
export default Root