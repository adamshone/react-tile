"use strict"

var React = require('react/addons');

var ExecuteButton = React.createClass({

	splitRate(rateString) {

		return {
			bigFigure: rateString.substring(0,4),
			pips: rateString.substring(4,6),
			pipette: rateString.substring(6)
		};
	},

	onClick(event) {
		this.props.onClick({
			side: this.props.side,
			rate: this.props.rate
		});
	},

	render() {
  
		var rateParts = this.splitRate(this.props.rate);

		return(
		    <div className="Tile-btn Tile-btnRow--btn" onClick={this.onClick}>
		      <small>{rateParts.bigFigure}</small>
		      <em>{rateParts.pips}</em>
		      <span>{rateParts.pipette}</span>
		    </div>
		);
	}
});

module.exports = ExecuteButton;