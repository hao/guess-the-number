var React = require('react');
var statusRT = require('./status.rt');

var Status = React.createClass({

  propTypes: {
    isCorrect: React.PropTypes.bool,
    isHigher: React.PropTypes.bool,
    isLower: React.PropTypes.bool
  },

  render: statusRT
});

module.exports = Status;
