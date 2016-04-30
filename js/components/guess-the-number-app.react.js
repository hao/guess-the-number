var React = require('react');
var classNames = require('classnames');

var guessTheNumberAppRT = require('./guess-the-number-app.rt');

var GuessTheNumberStore = require('../stores/guess-the-number-store');

var GuessTheNumberApp = React.createClass({

  getInitialState: function() {
    return {
      bounds: GuessTheNumberStore.getBounds(),
      guess: null,
      isCorrect: false,
      isHigher: false,
      isLower: false,
      configTabClasses: classNames({
        active: false
      }),
      playTabClasses: classNames({
        active: true
      })
    };
  },

  componentDidMount: function() {
    GuessTheNumberStore.addGuessListener(this._onGuess);
    GuessTheNumberStore.addBoundsChangeListener(this._onBoundsChange);
  },

  componentWillUnmount: function() {
    GuessTheNumberStore.removeGuessListener(this._onGuess);
    GuessTheNumberStore.removeBoundsChangeListener(this._onBoundsChange);
  },

  render: guessTheNumberAppRT,

  _onBoundsChange: function() {
    var state = this.state;
    state.bounds = GuessTheNumberStore.getBounds();
    state.guess = null;
    state.isCorrect = false;
    state.isHigher = false;
    state.isLower = false;
    this.setState(state);
  },

  _onConfig: function() {
    var state = this.state;
    state.configTabClasses = classNames({
      active: true
    });
    state.playTabClasses = classNames({
      active: false
    });
    this.setState(state);
  },

  _onGuess: function(value) {
    var state = this.state;
    state.guess = value;
    state.isCorrect = GuessTheNumberStore.isLastGuessCorrect();
    state.isHigher = GuessTheNumberStore.isLastGuessHigher();
    state.isLower = GuessTheNumberStore.isLastGuessLower();
    this.setState(state);
  },

  _onPlay: function() {
    var state = this.state;
    state.configTabClasses = classNames({
      active: false
    });
    state.playTabClasses = classNames({
      active: true
    });
    this.setState(state);
  },

});

module.exports = GuessTheNumberApp;
