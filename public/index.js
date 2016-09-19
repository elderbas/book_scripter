import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import configureStore from './redux/configureStore'
const store = configureStore()
require('font-awesome/css/font-awesome.css');

global.log = {
  whenRender: false
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
