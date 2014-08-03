'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../style/vendor/base.css');
require('../../style/main.css');

// Imports
var MessageService = require('../message-service');
var Tile = require('./tile/tile-component.jsx');

// Main
var messageService = new MessageService(125);
messageService.connect();

var supportedCurrencyPairs = messageService.getSupportedCurrencyPairs();

for(var i=0; i<supportedCurrencyPairs.length; i++) {
  var currencyPair = supportedCurrencyPairs[i % supportedCurrencyPairs.length];
  var child = document.createElement("SPAN");
  React.renderComponent(
    <Tile currencyPair={currencyPair} messageService={messageService}/>,
    child
  );
  document.getElementById('react-tile').appendChild(child);
}