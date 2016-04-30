var React = require('react');
var guessInputRT = require('./guess-input.rt');
var GuessTheNumberActions = require('../../actions/guess-the-number-actions');

var GuessInput = React.createClass({
  _onChange: function (event) {
    this.setState({
      value: event.target.value
    });
  },

  _onClick: function (event) {
    GuessTheNumberActions.guess(this.state.value);
    event.preventDefault();
  },

  render: guessInputRT
});

module.exports = GuessInput;
