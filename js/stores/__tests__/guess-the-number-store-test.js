jest.dontMock('../../constants/guess-the-number-constants');
jest.dontMock('../guess-the-number-store');
jest.dontMock('object-assign');

describe('GuessTheNumberStore', function () {
  var GuessTheNumberConstants = require('../../constants/guess-the-number-constants');
  var AppDispatcher;
  var GuessTheNumberStore;
  var callback;

  // mock values
  var mockLowerBound = 9;
  var mockUpperBound = 42;

  // mock actions
  var mockActionSetLowerBound = {
    actionType: GuessTheNumberConstants.ACTION_BOUNDS_SET_LOWER,
    value: mockLowerBound
  };
  var mockActionSetUpperBound = {
    actionType: GuessTheNumberConstants.ACTION_BOUNDS_SET_UPPER,
    value: mockUpperBound
  };
  var mockActionResetBounds = {
    actionType: GuessTheNumberConstants.ACTION_BOUNDS_RESET
  };
  var mockActionGuessNumber = {
    actionType: GuessTheNumberConstants.ACTION_GUESSES_GUESS
  };

  beforeEach(function () {
    AppDispatcher = require('../../dispatcher/AppDispatcher');
    GuessTheNumberStore = require('../guess-the-number-store');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('should register a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize the lower bound', function () {
    var bounds = GuessTheNumberStore.getBounds();
    expect(bounds.lower).toEqual(1);
  });

  it('should initialize the upper bound', function () {
    var bounds = GuessTheNumberStore.getBounds();
    expect(bounds.upper).toEqual(10);
  });

  it('should initialize the random number', function () {
    var number = GuessTheNumberStore.getNumberToGuess();
    expect(number).toBeDefined();
    expect(number).toNotEqual(null);
  });

  it('should set the lower bound', function () {
    callback(mockActionSetLowerBound);
    var bounds = GuessTheNumberStore.getBounds();
    expect(bounds.lower).toEqual(mockLowerBound);
  });

  it('should set the upper bound', function () {
    callback(mockActionSetUpperBound);
    var bounds = GuessTheNumberStore.getBounds();
    expect(bounds.upper).toEqual(mockUpperBound);
  });

  it('should reset the lower bound', function () {
    callback(mockActionResetBounds);
    var bounds = GuessTheNumberStore.getBounds();
    expect(bounds.lower).toEqual(GuessTheNumberConstants.BOUNDS_LOWER_DEFAULT);
  });

  it('should reset the upper bound', function () {
    callback(mockActionResetBounds);
    var bounds = GuessTheNumberStore.getBounds();
    expect(bounds.upper).toEqual(GuessTheNumberConstants.BOUNDS_UPPER_DEFAULT);
  });

  it('should allow guessing the number', function () {
    var actionGuessNumber = mockActionGuessNumber;
    var actionSetUpperBound = mockActionSetUpperBound;
    var firstGuessCorrect;
    var secondGuessCorrect;

    actionSetUpperBound.value = GuessTheNumberConstants.BOUNDS_LOWER_DEFAULT + 1;

    callback(mockActionResetBounds);
    callback(actionSetUpperBound);

    actionGuessNumber.value = GuessTheNumberConstants.BOUNDS_LOWER_DEFAULT;
    callback(actionGuessNumber);
    firstGuessCorrect = GuessTheNumberStore.isLastGuessCorrect();

    actionGuessNumber.value = GuessTheNumberConstants.BOUNDS_LOWER_DEFAULT + 1;
    callback(actionGuessNumber);
    secondGuessCorrect = GuessTheNumberStore.isLastGuessCorrect();

    expect(firstGuessCorrect || secondGuessCorrect).toBe(true);
  });
});
