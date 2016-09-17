// LogOnRender
import React from 'react'

const LogOnRender = (WrappedComponent) => {
  return class hoc extends React.Component {
    render() {
      if (global.log.whenRender) {
        console.log(`%c ${WrappedComponent.name} r`, 'color: #dbdb2c;');
      }
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
}



export default LogOnRender