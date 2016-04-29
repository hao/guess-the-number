var React = require('react');
var promptRT = require('./prompt.rt');
var guessTheNumberStore = require('../../stores/guess-the-number-store');

var bounds = guessTheNumberStore.getBounds();

var Prompt = React.createClass({
  bounds: bounds,
  render: promptRT
});

module.exports = Prompt;
