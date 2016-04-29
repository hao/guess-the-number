var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var guessTheNumberConstants = require('../constants/guess-the-number-constants');
var assign = require('object-assign');

var BOUNDS_CHANGE_EVENT = 'boundsChange';

var _numberToGuess;
var _guesses = [];
var _bounds = {};

var guessTheNumberStore = assign({}, EventEmitter.prototype, {
  getBounds: function () {
    return _bounds;
  },

  getGuesses: function () {
    return _guesses;
  },

  getLastGuess: function () {
    if (_guesses.length > 0) {
      return _guesses[_guesses.length - 1];
    }
    return '';
  },

  getNumberToGuess: function () {
    return _numberToGuess;
  },

  isLastGuessCorrect: function () {
    if (_guesses.length < 1) {
      return false;
    }
    return _numberToGuess === _guesses[_guesses.length - 1];
  }
});

function _getRandomNumber(lower, upper) {
  var range = upper - lower;
  return Math.trunc((Math.random() * range) + lower);
}

function makeAGuess(value) {
  var guess = parseInt(value, 10);
  if (guessTheNumberStore.getLastGuess() !== guess) {
    _guesses.push(guess);
  }
}

function setNumberToGuess() {
  _numberToGuess = _getRandomNumber(_bounds.lower, _bounds.upper);
}

function setLowerBound(value) {
  if (typeof _bounds.lower === 'undefined' || (value > 0 && value < _bounds.upper)) {
    _bounds.lower = value;
  }
}

function setUpperBound(value) {
  if (typeof _bounds.upper === 'undefined' || (value > 0 && value > _bounds.lower)) {
    _bounds.upper = value;
  }
}

function resetBounds() {
  setLowerBound(guessTheNumberConstants.BOUNDS_LOWER_DEFAULT);
  setUpperBound(guessTheNumberConstants.BOUNDS_UPPER_DEFAULT);
  setNumberToGuess();
}

function activate () {
  resetBounds();
}

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case guessTheNumberConstants.ACTION_BOUNDS_SET_LOWER:
      setLowerBound(parseInt(action.value, 10));
      setNumberToGuess();
      break;
    case guessTheNumberConstants.ACTION_BOUNDS_SET_UPPER:
      setUpperBound(parseInt(action.value, 10));
      setNumberToGuess();
      break;
    case guessTheNumberConstants.ACTION_BOUNDS_RESET:
      resetBounds();
      break;
    case guessTheNumberConstants.ACTION_GUESSES_GUESS:
      makeAGuess(action.value);
      break;
    default:
  }
});

activate();

module.exports = guessTheNumberStore;
