var React = require('react');
var ReactPropTypes = React.PropTypes;
var lastGuessRT = require('./last-guess.rt');

var LastGuess = React.createClass({

  propTypes: {
    guess: ReactPropTypes.number
  },

  render: lastGuessRT
});

module.exports = LastGuess;
