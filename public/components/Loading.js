// Loading.js
const React = require('react')
const PropTypes = React.PropTypes;
const styles = {
  container: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    fontSize: '55px'
  },
  content: {
    textAlign: 'center',
    position: 'absolute',
    width: '100%',
    marginTop: '100px'
  }
};

const Loading = React.createClass({
  propTypes: {
    text: PropTypes.string,
    speed: PropTypes.number
  },
  getDefaultProps: function() {
    return {
      text: 'Loading',
      speed: 320
    }
  },
  getInitialState: function() {
    return {
      text: this.props.text,
      speed: this.props.speed
    };
  },
  componentDidMount: function () {
    // make the dots blink and reset to no dots eventually
    const textToStopAt = this.props.text + '...';
    this.interval = setInterval(function () {
      if (this.state.text === textToStopAt) {
        this.setState({
          text: this.props.text
        });
      } else {
        this.setState({
          text: this.state.text + '.'
        });
      }
    }.bind(this), this.state.speed);
  },
  render: function () {
    return (
      <div style={styles.container}>
        <p style={styles.content}>{this.state.text}</p>
      </div>
    )
  },
  componentWillUnmount: function () {
    clearInterval(this.interval);
  }
})

module.exports = Loading;










