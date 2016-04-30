var React = require('react');
var ReactPropTypes = React.PropTypes;
var statusRT = require('./status.rt');

var Status = React.createClass({

  propTypes: {
    isCorrect: ReactPropTypes.bool,
    isHigher: ReactPropTypes.bool,
    isLower: ReactPropTypes.bool
  },

  render: statusRT
});

module.exports = Status;
