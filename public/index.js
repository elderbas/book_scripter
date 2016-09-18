import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import configureStore from './redux/configureStore'
const store = configureStore()
global.log = {
  whenRender: false
}

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)
