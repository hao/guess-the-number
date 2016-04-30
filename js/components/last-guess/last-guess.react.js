var React = require('react');
var lastGuessRT = require('./last-guess.rt');

var LastGuess = React.createClass({

  propTypes: {
    guess: React.PropTypes.number
  },

  render: lastGuessRT
});

module.exports = LastGuess;
