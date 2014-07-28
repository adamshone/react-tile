/**
* @jsx React.DOM
*/

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

		var classes = React.addons.classSet({
			'Tile-btn': true,
			'Tile-btnRow--btn': true
		});
  
		var rateParts = this.splitRate(this.props.rate);

		return(
		    <div className={classes} onClick={this.onClick}>
		      <small>{rateParts.bigFigure}</small>
		      <em>{rateParts.pips}</em>
		      <span>{rateParts.pipette}</span>
		    </div>
		);
	}
});