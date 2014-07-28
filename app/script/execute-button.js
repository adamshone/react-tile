/**
* @jsx React.DOM
*/

var ExecuteButton = React.createClass({

	_splitRate(rateString) {

		return {
			bigFigure: rateString.substring(0,4),
			pips: rateString.substring(4,6),
			pipette: rateString.substring(6)
		};
	},

	render() {

	  var classes = React.addons.classSet({
	    'Tile-btn': true,
	    'Tile-btnRow--btn': true
	  });
  
  // return <div className={classes}>Great, I'll be there.</div>;

		var rateParts = this._splitRate(this.props.rate);

		return(
	        <div className={classes}>
	          <small>{rateParts.bigFigure}</small>
	          <em>{rateParts.pips}</em>
	          <span>{rateParts.pipette}</span>
	        </div>
		);
	}
});