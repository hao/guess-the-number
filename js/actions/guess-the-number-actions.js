var AppDispatcher = require('../dispatcher/AppDispatcher');
var GuessTheNumberConstants = require('../constants/guess-the-number-constants');

var GuessTheNumberActions = {
  guess: function(value) {
    AppDispatcher.dispatch({
      actionType: GuessTheNumberConstants.ACTION_GUESSES_GUESS,
      value: value
    })
  }
};

module.exports = GuessTheNumberActions;
