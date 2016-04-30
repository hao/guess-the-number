var React = require('react');
var ReactDOM = require('react-dom');

var GuessTheNumberApp = require('./components/guess-the-number-app.react');
var GuessTheNumberSettings = require('./components/guess-the-number-settings.react');

ReactDOM.render(
  <GuessTheNumberApp />,
  document.getElementById('guess-the-number-app')
);
