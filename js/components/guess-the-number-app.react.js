var React = require('react');

var GuessInput = require('./guess-input/guess-input.react');
var LastGuess = require('./last-guess/last-guess.react');
var Prompt = require('./prompt/prompt.react');
var Status = require('./status/status.react');

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
  render: function() {
    return (
      <div>
        <Prompt
          bounds={this.state.bounds} />
        <LastGuess
          guess={this.state.guess} />
        <Status
          isCorrect={this.state.isCorrect}
          isHigher={this.state.isHigher}
          isLower={this.state.isLower} />
        <GuessInput />
      </div>
    );
  },

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
