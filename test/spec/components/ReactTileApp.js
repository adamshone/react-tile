'use strict';

describe('Main', function () {
  var ReactTileApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactTileApp = require('../../../src/scripts/components/ReactTileApp.jsx');
    component = ReactTileApp();
  });

  it('should create a new instance of ReactTileApp', function () {
    expect(component).toBeDefined();
  });
});
