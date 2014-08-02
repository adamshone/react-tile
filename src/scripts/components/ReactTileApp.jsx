/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/reset.css');
require('../../styles/main.css');

var imageURL = '../../images/yeoman.png';

var ReactTileApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
      asas
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
      </div>
    );
  }
});

React.renderComponent(<ReactTileApp />, document.getElementById('content')); // jshint ignore:line

module.exports = ReactTileApp;
