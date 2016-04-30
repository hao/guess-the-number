var React = require('react');

var guessTheNumberAppRT = require('./guess-the-number-app.rt');

var GuessTheNumberStore = require('../stores/guess-the-number-store');

var GuessTheNumberApp = React.createClass({

  getInitialState: function() {
    return {
      bounds: GuessTheNumberStore.getBounds(),
      guess: null,
      isCorrect: false,
      isHigher: false,
      isLower: false
    };
  },

  componentDidMount: function() {
    GuessTheNumberStore.addGuessListener(this._onGuess);
  },

  componentWillUnmount: function() {
    GuessTheNumberStore.removeGuessListener(this._onGuess);
  },

  /**
   * @return {object}
   */
  render: guessTheNumberAppRT,

  _onGuess: function(value) {
    this.setState({
      bounds: GuessTheNumberStore.getBounds(),
      guess: value,
      isCorrect: GuessTheNumberStore.isLastGuessCorrect(),
      isHigher: GuessTheNumberStore.isLastGuessHigher(),
      isLower: GuessTheNumberStore.isLastGuessLower(),
    });
  }

});

module.exports = GuessTheNumberApp;
