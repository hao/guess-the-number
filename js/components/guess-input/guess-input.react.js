var React = require('react');
var guessInputRT = require('./guess-input.rt');
var GuessTheNumberActions = require('../../actions/guess-the-number-actions');

var GuessInput = React.createClass({
  propTypes: {
    isCorrect: React.PropTypes.bool
  },

  _onChange: function (event) {
    this.setState({
      value: event.target.value
    });
  },

  _onClick: function (event) {
    if (this.props.isCorrect) {
      GuessTheNumberActions.play();
    } else {
      GuessTheNumberActions.guess(this.state.value);
    }
    event.preventDefault();
  },

  render: guessInputRT
});

module.exports = GuessInput;
