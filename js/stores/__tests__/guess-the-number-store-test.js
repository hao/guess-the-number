jest.dontMock('../../constants/guess-the-number-constants');
jest.dontMock('../guess-the-number-store');
jest.dontMock('object-assign');

describe('guessTheNumberStore', function () {
  var guessTheNumberConstants = require('../../constants/guess-the-number-constants');
  var AppDispatcher;
  var guessTheNumberStore;
  var callback;

  // mock values
  var mockLowerBound = 9;
  var mockUpperBound = 42;

  // mock actions
  var mockActionSetLowerBound = {
    actionType: guessTheNumberConstants.ACTION_BOUNDS_SET_LOWER,
    value: mockLowerBound
  };
  var mockActionSetUpperBound = {
    actionType: guessTheNumberConstants.ACTION_BOUNDS_SET_UPPER,
    value: mockUpperBound
  };
  var mockActionResetBounds = {
    actionType: guessTheNumberConstants.ACTION_BOUNDS_RESET
  };
  var mockActionGuessNumber = {
    actionType: guessTheNumberConstants.ACTION_GUESSES_GUESS
  };

  beforeEach(function () {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    guessTheNumberStore = require('../guess-the-number-store');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize the lower bound', function () {
    var bounds = guessTheNumberStore.getBounds();
    expect(bounds.lower).toEqual(1);
  });

  it('should initialize the upper bound', function () {
    var bounds = guessTheNumberStore.getBounds();
    expect(bounds.upper).toEqual(10);
  });

  it('should initialize the random number', function () {
    var number = guessTheNumberStore.getNumberToGuess();
    expect(number).toBeDefined();
    expect(number).toNotEqual(null);
  });

  it('should set the lower bound', function () {
    callback(mockActionSetLowerBound);
    var bounds = guessTheNumberStore.getBounds();
    expect(bounds.lower).toEqual(mockLowerBound);
  });

  it('should set the upper bound', function () {
    callback(mockActionSetUpperBound);
    var bounds = guessTheNumberStore.getBounds();
    expect(bounds.upper).toEqual(mockUpperBound);
  });

  it('should reset the lower bound', function () {
    callback(mockActionResetBounds);
    var bounds = guessTheNumberStore.getBounds();
    expect(bounds.lower).toEqual(guessTheNumberConstants.BOUNDS_LOWER_DEFAULT);
  });

  it('should reset the upper bound', function () {
    callback(mockActionResetBounds);
    var bounds = guessTheNumberStore.getBounds();
    expect(bounds.upper).toEqual(guessTheNumberConstants.BOUNDS_UPPER_DEFAULT);
  });

  it('should allow guessing the number', function () {
    var actionGuessNumber = mockActionGuessNumber;
    var actionSetUpperBound = mockActionSetUpperBound;
    var firstGuessCorrect;
    var secondGuessCorrect;

    actionSetUpperBound.value = guessTheNumberConstants.BOUNDS_LOWER_DEFAULT + 1;

    callback(mockActionResetBounds);
    callback(actionSetUpperBound);

    actionGuessNumber.value = guessTheNumberConstants.BOUNDS_LOWER_DEFAULT;
    callback(actionGuessNumber);
    firstGuessCorrect = guessTheNumberStore.isLastGuessCorrect();

    actionGuessNumber.value = guessTheNumberConstants.BOUNDS_LOWER_DEFAULT + 1;
    callback(actionGuessNumber);
    secondGuessCorrect = guessTheNumberStore.isLastGuessCorrect();

    expect(firstGuessCorrect || secondGuessCorrect).toBe(true);
  });
});
