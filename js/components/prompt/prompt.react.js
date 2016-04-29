var React = require('react');
var promptRT = require('./prompt.rt');
var guessTheNumberStore = require('../../stores/guess-the-number-store');

var Prompt = React.createClass({
  bounds: guessTheNumberStore.getBounds(),
  render: promptRT
});

module.exports = Prompt;
