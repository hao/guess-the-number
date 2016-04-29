var React = require('react');
var lastGuessRT = require('./last-guess.rt');
var guessTheNumberStore = require('../../stores/guess-the-number-store');

var LastGuess = React.createClass({
  guess: guessTheNumberStore.getLastGuess(),
  render: lastGuessRT
});

module.exports = LastGuess;
