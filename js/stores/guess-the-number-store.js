var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var GuessTheNumberConstants = require('../constants/guess-the-number-constants');
var assign = require('object-assign');

var _numberToGuess;
var _guesses = [];
var _bounds = {};

var GuessTheNumberStore = assign({}, EventEmitter.prototype, {
  addGuessListener: function(callback) {
    this.on(GuessTheNumberConstants.EVENT_GUESSES_GUESS, callback);
  },

  emitGuess: function(value) {
    this.emit(GuessTheNumberConstants.EVENT_GUESSES_GUESS, value);
  },

  removeGuessListener: function(callback) {
    this.removeListener(GuessTheNumberConstants.EVENT_GUESSES_GUESS, callback);
  },

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
  },

  isLastGuessHigher: function () {
    if (_guesses.length < 1) {
      return false;
    }
    return _numberToGuess > _guesses[_guesses.length - 1];
  },

  isLastGuessLower: function () {
    if (_guesses.length < 1) {
      return false;
    }
    return _numberToGuess < _guesses[_guesses.length - 1];
  }
});

function _getRandomNumber(lower, upper) {
  var range = upper - lower;
  return Math.trunc((Math.random() * range) + lower);
}

function makeAGuess(value) {
  var guess = parseInt(value, 10);
  if (GuessTheNumberStore.getLastGuess() !== guess) {
    _guesses.push(guess);
    GuessTheNumberStore.emitGuess(guess);
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
  setLowerBound(GuessTheNumberConstants.BOUNDS_LOWER_DEFAULT);
  setUpperBound(GuessTheNumberConstants.BOUNDS_UPPER_DEFAULT);
  setNumberToGuess();
}

function activate () {
  resetBounds();
}

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case GuessTheNumberConstants.ACTION_BOUNDS_SET_LOWER:
      setLowerBound(parseInt(action.value, 10));
      setNumberToGuess();
      break;
    case GuessTheNumberConstants.ACTION_BOUNDS_SET_UPPER:
      setUpperBound(parseInt(action.value, 10));
      setNumberToGuess();
      break;
    case GuessTheNumberConstants.ACTION_BOUNDS_RESET:
      resetBounds();
      break;
    case GuessTheNumberConstants.ACTION_GUESSES_GUESS:
      makeAGuess(action.value);
      break;
    default:
  }
});

activate();

module.exports = GuessTheNumberStore;
