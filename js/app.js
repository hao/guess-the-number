var React = require('react');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var Link = require('react-router').Link;
var IndexLink = require('react-router').IndexLink;
var browserHistory = require('react-router').browserHistory;

var GuessTheNumberApp = require('./components/guess-the-number-app.react');

React.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={GuessTheNumberApp}>
      </Route>
    </Router>
  ), document.getElementById('guess-the-number-app')
);
