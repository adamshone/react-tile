"use strict"

var React = require('react/addons');

var DateRow = React.createClass({

	render() {

		var settlementDateText = `${this.props.settlementDate} (${this.props.tenor})`;

		return(
			<div className="Tile-dateRow">
				<input type="text" className="Tile-dateRow--dateInput" defaultValue={settlementDateText}></input>
				<div className="Tile-dateRow--calendarBtn Tile-btn">C</div>
			</div>
		);
	}
});

module.exports = DateRow;