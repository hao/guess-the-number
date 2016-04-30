var AppDispatcher = require('../dispatcher/AppDispatcher');
var GuessTheNumberConstants = require('../constants/guess-the-number-constants');

var GuessTheNumberActions = {
  changeLowerBound: function(value) {
    AppDispatcher.dispatch({
      actionType: GuessTheNumberConstants.ACTION_BOUNDS_SET_LOWER,
      value: value
    })
  },

  changeUpperBound: function(value) {
    AppDispatcher.dispatch({
      actionType: GuessTheNumberConstants.ACTION_BOUNDS_SET_UPPER,
      value: value
    })
  },

  guess: function(value) {
    AppDispatcher.dispatch({
      actionType: GuessTheNumberConstants.ACTION_GUESSES_GUESS,
      value: value
    })
  },

  play: function() {
    AppDispatcher.dispatch({
      actionType: GuessTheNumberConstants.ACTION_PLAY
    })
  },

  resetBounds: function() {
    AppDispatcher.dispatch({
      actionType: GuessTheNumberConstants.ACTION_BOUNDS_RESET
    })
  }
};

module.exports = GuessTheNumberActions;
