"use strict"

var React = require('react/addons');
var ExecuteButton = require('./execute-button.jsx');

var ButtonRow = React.createClass({

	render() {

		return(
			<div className="Tile-btnRow">
		        <ExecuteButton side="bid" rate={this.props.bid} onClick={this.props.onExecuteButtonClicked} />
		        <ExecuteButton side="ask" rate={this.props.ask} onClick={this.props.onExecuteButtonClicked} />
			</div>
		);
	}
});

module.exports = ButtonRow;