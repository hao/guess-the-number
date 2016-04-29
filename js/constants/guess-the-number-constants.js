var keyMirror = require('keymirror');
var _ = require('lodash');

var guessTheNumberConstants = _.extend(
  keyMirror({
    ACTION_BOUNDS_SET_LOWER: null,
    ACTION_BOUNDS_SET_UPPER: null,
    ACTION_BOUNDS_RESET: null,
    ACTION_GUESSES_GUESS: null
  }), {
    BOUNDS_LOWER_DEFAULT: 1,
    BOUNDS_UPPER_DEFAULT: 10
  }
);

module.exports = guessTheNumberConstants;
