var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var guessTheNumberConstants = require('../constants/guess-the-number-constants');
var assign = require('object-assign');

var BOUNDS_CHANGE_EVENT = 'boundsChange';

var _guesses = [];
var _bounds = {
  lower: 1,
  upper: 10
};

function setLowerBound(value) {
  _bounds.lower = value;
}

function setUpperBound(value) {
  _bounds.upper = value;
}

var guessTheNumberStore = assign({}, EventEmitter.prototype, {
  getBounds: function () {
    return _bounds;
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case guessTheNumberConstants.ACTION_BOUNDS_SET_LOWER:
      setLowerBound(parseInt(action.value, 10));
      break;
    case guessTheNumberConstants.ACTION_BOUNDS_SET_UPPER:
      setUpperBound(parseInt(action.value, 10));
      break;
    default:

  }
});

module.exports = guessTheNumberStore;
