var React = require('react');
var configRT = require('./config.rt');
var GuessTheNumberActions = require('../../actions/guess-the-number-actions');

var Config = React.createClass({
  propTypes: {
    bounds: React.PropTypes.object,
    configTabClasses: React.PropTypes.string
  },

  _onLowerChange: function (event) {
    GuessTheNumberActions.changeLowerBound(event.target.value);
  },

  _onUpperChange: function (event) {
    GuessTheNumberActions.changeUpperBound(event.target.value);
  },

  _onClick: function (event) {
    GuessTheNumberActions.resetBounds();
    event.preventDefault();
  },

  render: configRT
});

module.exports = Config;
