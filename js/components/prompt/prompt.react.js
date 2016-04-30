var React = require('react');
var promptRT = require('./prompt.rt');
var GuessTheNumberStore = require('../../stores/guess-the-number-store');

var Prompt = React.createClass({

  propTypes: {
    bounds: React.PropTypes.object.isRequired
  },

  render: promptRT
});

module.exports = Prompt;
